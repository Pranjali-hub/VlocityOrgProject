trigger OpportunityTrigger on Opportunity (after insert, after update,after delete, after undelete) {

    List<Id> accountIds = new List<Id>();
    List<Accounts> accountsToUpdate = new List<Accounts>();

    if(Trigger.isAfter){
        if(Trigger.isInsert || Trigger.isUpdate){
            for(Opportunity opp : Trigger.New){
                accountIds.add(opp.AccountId);
            }
        }
        if(Trigger.isDelete){
            for(Opportunity opp : Trigger.Old){
                accountIds.add(opp.AccountId);
            }
        }   
    }

    for(Account acc : [SELECT Id, Name,MaximumOpportunityName (SELECT Id,name FROM Opportunities Order By Amount DESC LMIT 1) FROM Account WHERE Id  IN :accountIds]){
        acc.MaximumOpportunityName = acc.Opportunities[0].Name;
        accountsToUpdate.add(acc);
    }

    if(!accountsToUpdate.isEmpty()){
        update accountsToUpdate;
    }
    

}