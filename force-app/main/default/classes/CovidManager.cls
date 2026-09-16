public class CovidManager {

    @AuraEnabled
    public static List<Covid19CountrySummary> getCovid19Summary(){

        List<Covid19CountrySummary> covid19Summary = new List<Covid19CountrySummary>();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.covid19india.org/state_district_wise.json');
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');

        Http h = new Http();
        HttpResponse response = h.send(req);

        System.debug('Response:' + response.getBody());

        retunn covid19Summary;


    }

    public class Covid19CountrySummary{
        

    }
    
}