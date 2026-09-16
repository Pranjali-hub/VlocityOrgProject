@isTest
public with sharing class ApexPracticeClassTest {

    @TestSetup
    static void setupTestData() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;     

        List<Contact> contacts = new List<Contact>{
            new Contact(
                FirstName = 'John',
                LastName = 'Doe',
                Email = 'john@test.com',
                AccountId = acc.Id
            ),
            new Contact(
                FirstName = 'Jane',
                LastName = 'Doe',
                Email = 'jane@test.com',
                AccountId = acc.Id
            ),
            new Contact(
                FirstName = 'Test',
                LastName = 'Contact',
                AccountId = acc.Id
            )
        };

        insert contacts;

    }

    
    @IsTest
    static void testSendEmailWithValidEmail() {
        Test.startTest();
        ApexPracticeClass.sendEmailAlert('test@example.com');
        Test.stopTest();
    }
    @IsTest
    static void testGetEmailAddresses() {

        Test.startTest();
        List<String> result = ApexPracticeClass.getEmailAddresses('Test Account');
        Test.stopTest();
        System.assertEquals(2, result.size());
        System.assert(result.contains('john@test.com'));
        System.assert(result.contains('jane@test.com'));
    }

    @IsTest
    static void testCheckAccountContactRelation() {
        Test.startTest();
        Boolean result = ApexPracticeClass.checkAccountContactRelation('Test Account', 'John Doe');
        Test.stopTest();
        System.assertEquals(true, result);  
    }
}