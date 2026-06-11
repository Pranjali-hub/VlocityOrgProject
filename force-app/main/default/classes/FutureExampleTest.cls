@isTest
public class FutureExampleTest {

    @isTest
    public static void testCountContacts(){

        List<Account> accList = new List<Account>();
        for(Integer i =0; i<150;i++){
            accList.add(new Account(Name = 'Test Account'+i));
        }
        insert accList;

        List<Contact> conList = new List<Contact>();
        List<Id> accIds = new List<Id>();
        for(Account acc : accList){
            conList.add(new Contact(FirstName='Test', LastName = acc.Name, accountId = acc.Id));
            accIds.add(acc.Id);
        }
        insert conList;
        Test.startTest();
        FutureExample.countContacts(accIds);
        Test.StopTest();

        List<Account> updatedAccList = [SELECT Id, Total_Contact_Count__c FROM Account WHERE Id IN :accIds];
        System.assertEquals(1, updatedAccList[0].Total_Contact_Count__c, 'Total Contact not updated correctly');

    }
   
}