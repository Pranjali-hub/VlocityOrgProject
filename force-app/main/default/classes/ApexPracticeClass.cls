public with sharing class ApexPracticeClass {

    public static void sendEmailAlert(String emailAddress){
        if(!String.isBlank(emailAddress)){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setSubject('Urgent - Action Required');
            mail.setPlainTextBody('Please review the attached document and provide your feedback by EOD. Your prompt attention to this matter is greatly appreciated.');
            mail.setToAddresses(new String[] {emailAddress});
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }else{
            throw new AuraHandledException('Email address cannot be blank.');
        }
    }

    public static List<String> getEmailAddresses(String accName){

        List<String> emailAddresses = new List<String>();
        List<Contact> contactList = [SELECT Email FROM Contact WHERE Account.Name = :accName];
        if(contactList.size() > 0){
            for(Contact c : contactList){
                if(c.Email != null){
                    emailAddresses.add(c.Email);
                }
            }
        }
        return emailAddresses;
    }

    public static boolean checkAccountContactRelation( String accName, String contactName){
        List<Contact> contactList = [SELECT Id FROM Contact WHERE Account.Name = :accName AND Name = :contactName];
        if(contactList.size() > 0){
            return true;
        }
        return false;
    }
        
}