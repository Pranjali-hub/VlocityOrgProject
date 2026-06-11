
trigger OpportunityTriggerNew on Opportunity (after insert, after update, after delete, after undelete) {

    Set<String> accIdList = new Set<String>();

    if(Trigger.isInsert || Trigger.isUpdate || Trigger.undelete){
        for(Opportunity opp : Trigger.New){
            accIdList.add(opp.AccountId);
        }
    }

    if(Trigger.isDelete){
        for(opportunity opp: Trigger.old){
            accIdList.add(opp.AccountId);
        }
    }

    List<AggregateResult> arrList = [SELECT AccountId, COUNT(Id) opptyCount, AVG(Amount) avgAmount 
                                    FROM Opportunity                     
                                    WHERE(AccountId IN: accIdList AND StageName ='Closed Won') 
                                    GROUP BY AccountId];

    List<Account> accToUpdate = new List<Account>();

    for(AggregateResult arr : arrList){

        accToUpdate.add(new Account(Id = (String) arr.get('AccountId'),
                                    Number_Of_Closed_Won_Opportunity__c = (Integer) arr.get('opptyCount'),
                                    Average_Closed_Won_Oppty_Amount__c = (Decimal) arr.get('avgAmount')
                                    ));

    }

    if(!accToUpdate.isEmpty()){
        update accToUpdate; 
        
                                    
    }
}

 
    
    
