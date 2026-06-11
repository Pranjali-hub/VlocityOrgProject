public with sharing class AccountTriggerHandler {

    public static void handleAfterUpdate(List<Account> newRecords, Map<Id,Account>oldMap){
        List<Account> accList = new List<Account>();
        List<Id> sendThisList = new List<Id>();
        for(Account acc: newRecords){
            if(acc.Industry != oldMap.get(acc.Id).Industry && acc.Industry == 'Biotechnology'){
                sendThisList.add(acc.Id);
            }
        }

        if(!sendThisList.isEmpty()){
            CallAsyncApex(sendThisList);
        }
    }

    @future
    public static void CallAsyncApex(List<Id> accountIds){
        List<Contact> contactToUpdate = new List<Contact>();
        List<Contact> contactList = [SELECT Id, LeadSource FROM Contact WHERE AccountId IN :accountIds];
        for(Contact con : contactList){
            con.LeadSource = 'Web';
            contactToUpdate.add(con);
        }
        if(!contactToUpdate.isEmpty()){
            update contactToUpdate;
        }

    }

    public static void handlePhoneUpdate (List<Account> newRecords, Map<Id,Account>oldMap){
        Map<Id, String> accPhoneMap = new Map<Id, String>();
        List<Contact> contactToUpdate = new List<Contact>();
        for(Account acc: newRecords){
            if(acc.Phone!= oldMap.get(acc.Id).Phone){
                accPhoneMap.put(acc.Id, acc.Phone);
            }
        }
        if(!accPhoneMap.isEmpty()){
            List<Contact> contactList = [SELECT Id, Phone, AccountId FROM Contact WHERE AccountId IN :accPhoneMap.keySet()];
            for(Contact con : contactList){
                if(con.Phone == oldMap.get(con.AccountId).Phone || con.Phone == null){
                    con.phone = accPhoneMap.get(con.AccountId);
                    contactToUpdate.add(con);
                }
            }
        }
        if(!contactToUpdate.isEmpty()){
            update contactToUpdate;
        }
    }
}