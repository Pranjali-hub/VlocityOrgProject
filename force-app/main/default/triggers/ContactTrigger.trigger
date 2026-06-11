trigger AccountContactTrigger on Account (after insert, after delete) {

    List<Account> accToUpdate = new List<Account>();
    List<Id> accIds = new List<Id>();
    if(Trigger.isAfter && Trigger.isInsert){
        handleAfterInsert(Trigger.NEW);
    }

    if(Trigger.isAfter && Trigger.isDelete){
        handleAfterDelete(Trigger.OLD);
    }

    handleAfterInsert(List<Contact> newContacts){
        for(Contact con : newContacts){
            accIds.add(con.AccountId);
        }

        // totalcontacts per Account
        List<AggregateResult> aggResults = [SELECT AccountId, COUNT(Id)totalContacts FROM Contact WHERE AccountId IN :accIds GROUP BY AccountId];

        for(AggregateResult agg : aggResults){
            Id accId = (Id)agg.get('AccountId');
            Integer totalContacts = (Integer)agg.get('totalContacts');
            Account acc = new Account(Id = accId, Total_Contacts__c = totalContacts);
            accToUpdate.add(acc);
        }

        update accToUpdate;
    }
    
    
}