public with sharing class IntegrationController {

    public static String accessToken = '';
    public static String instanceUrl = '';
    
    public static void getLeadInformationFromThirdParty() {   
        List<Integration_Setup__c> integrationConfigs = [SELECT Id,Client_Secreat__c,ClientId__c,Server_Name__c,Server_UserName__c, Server_Password__c FROM Integration_Setup__c WHERE Server_Name__c = 'CtrlServer' LIMIT 1];
        String responseMessage = '';
        if(!integrationConfigs.isEmpty() || integrationConfigs.size() >0){
            String accesstokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(accesstokenEndpoint);
            request.setHeader('Content-Type','application/x-www-form-urlencoded');
            request.setMethod('POST');
            request.setBody(
                        'grant_type=password'
                        +'&client_id='+integrationConfigs[0].ClientId__c
                        +'&client_secret='+integrationConfigs[0].Client_Secreat__c
                        +'&username='+integrationConfigs[0].Server_UserName__c
                        +'&password='+integrationConfigs[0].Server_Password__c
                        );
            HttpResponse response = http.send(request);    
            
            if(response.getStatusCode() == 200){
                Map<String,Object> result =
                    (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
                accessToken = (String)result.get('access_token');
                instanceUrl = (String)result.get('instance_url');
                System.debug('Access Token: ' + accessToken);
                System.debug('Instance URL: ' + instanceUrl);
                responseMessage = 'Access Token and Instance URL retrieved successfully.';

            }else{
                System.debug('Error: ' + response.getBody());
                responseMessage = 'Failed to retrieve Access Token and Instance URL.';
            }
        }   
        System.debug('responseMessage' + responseMessage);
    }

    @AuraEnabled
    public static List<leadResponse> RequestLeadInformation(String leadName){
        IntegrationController.getLeadInformationFromThirdParty();
        List<leadResponse> leadResponseList = new List<leadResponse>();
        String leadInfoEndpoint = instanceUrl + '/services/apexrest/LeadService/name='+leadName;
        System.debug('Lead Info Endpoint: ' + leadInfoEndpoint);
        Http http = new Http(); 
        httpRequest request = new HttpRequest();
        request.setEndpoint(leadInfoEndpoint);
        request.setHeader('Authorization', 'Bearer ' + accessToken);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');  
        HttpResponse response = http.send(request);    
        System.debug('Lead Info Response Status: ' + response.getStatusCode());

        if(response.getStatusCode() == 200){
        List<Object> records = (List<Object>)JSON.deserializeUntyped(response.getBody());
        for(Object obj : records){
            Map<String,Object> data = (Map<String,Object>)obj;

            leadResponse lr = new leadResponse();
            lr.Id = (String)data.get('Id');
            lr.Name = (String)data.get('Name');
            lr.Company = (String)data.get('Company');
            lr.Email = (String)data.get('Email');
            lr.Phone = (String)data.get('Phone');
            leadResponseList.add(lr);
            //System.debug('Lead Information Response: ' + responseBody);
        }}else{
            System.debug('Error retrieving lead information: ' + response.getBody());   
        } 
        System.debug('Lead Response List: ' + leadResponseList);
        return leadResponseList;

    }

    public class leadResponse {
        @AuraEnabled public String Id { get; set; }
        @AuraEnabled public String Name { get; set; }
        @AuraEnabled public String Company { get; set; }
        @AuraEnabled public String Email { get; set; }
        @AuraEnabled public String Phone { get; set; }
    }

}