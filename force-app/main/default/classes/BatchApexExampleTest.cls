@isTest
public class BatchApexExampleTest {

    @isTest
    public static void testBatchApexExample(){
        List<Opportunity> oppList = new List<Opportunity>();
        for(Integer i =0; i<200;i++){
            oppList.add(new Opportunity(Name = 'Test Opportunity'+i, StageName = 'Prospecting', CloseDate = Date.today()));
        }
        insert oppList;

        Test.startTest();
        BatchApexExample batch = new BatchApexExample();
        Database.executeBatch(batch);
        Test.stopTest();

        List<Opportunity> updatedOppList = [SELECT Id, LeadSource FROM Opportunity WHERE Id IN :oppList];
        for(Opportunity opp : updatedOppList){
            System.assertEquals('Web', opp.LeadSource, 'Lead Source not updated correctly');
        }
    }   
    
}