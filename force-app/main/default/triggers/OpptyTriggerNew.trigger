trigger OpptyTriggerNew on Opportunity (before delete) {


    Set<String> activityIdList = new Set<String>();


    if(Trigger.isDelete){
        for(Opportunity opp :[SELECT Id, Name, (SELECT id From Tasks),(Select Id FROM Events) FROM Opportunity  WHERE Id IN : Trigger.old]){
            List<Task> taskList = opp.Tasks;
            List<Event> eventList = opp.Events;

            if(!taskList.isEmpty()|| !eventList.isEmpty()){
                activityIdList.add(opp.Id);
            }
        }
    }

    for(Opportunity opp : Trigger.old){
        if(activityIdList.contains(opp.Id)){
            opp.addError('You Cannot Delete this Opportunity as open activity is there');
        }
    }
    

}