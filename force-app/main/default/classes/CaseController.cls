public with sharing class CaseController {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases( ) {

        User userRec = [SELECT Id, ManagerId FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        Set<Id> userIds = new Set<Id>();

        for(User sub : [SELECT Id FROM User WHERE ManagerId = :userRec.ManagerId]) {
            System.debug('Subordinate Id: ' + sub.Id);
            userIds.add(sub.Id);
        }
        List<Case> cases = [SELECT Id, CaseNumber, Subject,Status, Priority,OwnerId, Owner.Name FROM Case WHERE OwnerId IN :userIds LIMIT 200];
        return cases;
    }
   
}