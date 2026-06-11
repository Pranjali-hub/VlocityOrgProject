trigger AccountTrigger on Account (before insert, after update) {

    if(Trigger.isAfter && Trigger.isUpdate) {
        AccountTriggerHandler.handleAfterUpdate(Trigger.NEW, Trigger.oldMap);
        AccountTriggerHandler.handlePhoneUpdate(Trigger.NEW, Trigger.oldMap);
    }

}