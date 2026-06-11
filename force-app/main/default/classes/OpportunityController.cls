public with sharing class OpportunityController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(String stageName, String sortby, String sortDirection) {
        
        String query = 'SELECT Id, Name, StageName, Amount, CloseDate FROM Opportunity WHERE StageName = :stageName ORDER BY ' + sortby + ' ' + sortDirection;
        return
    }

}