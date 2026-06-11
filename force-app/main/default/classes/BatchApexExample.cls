public with sharing class BatchApexExample implements Database.Batchable<sObject>, Database.Stateful {

    public integer recordCount= 0;

    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT Id, Name FROM Opportunity]);
    }

    public void execute(Database.BatchableContext bc, List<Opportunity> oppList){
        List<Opportunity> oppToUpdate = new List<Opportunity>();
        for(Opportunity opp : oppList){
            opp.LeadSource = 'Web';
            oppToUpdate.add(opp);
        }
        if(!oppToUpdate.isEmpty()){
            update oppToUpdate;
        }
        recordCount =recordCount +oppList.size();
    }

    public void finish(Database.BatchableContext bc){

        System.debug('Total Records Procecessed:' + recordCount);

    }

}