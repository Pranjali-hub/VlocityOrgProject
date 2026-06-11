public with sharing class RefreshContactController {

@AuraEnabled(cacheable=true)
public static List<Contact> getContactsList(){
    return [SELECT Id, Name, FirstName, LastName, Email, Phone FROM Contact LIMIT 10];
}
    
}