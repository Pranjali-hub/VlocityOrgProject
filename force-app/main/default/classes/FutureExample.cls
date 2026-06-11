public with sharing class FutureExample {

    @future
    public static void countContacts(List<Id> accountIds){
        List<Account> accToUpdate = new List<Account>();
        for(Account acc : [SELECT Id, (SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountIds]){
            acc.Total_Contact_Count__c = acc.Contacts.size();
            accToUpdate.add(acc);
        }
        if(!accToUpdate.isEmpty()){
            update accToUpdate;
        }   
    }
   
}