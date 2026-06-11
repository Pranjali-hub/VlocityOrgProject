global with sharing class OmniController implements Callable{


    public Object call(String action, Map<String,Object> args){

      Map<String,Object> input = (Map<String,Object>)args.get('input');
      Map<String,Object> output = (Map<String,Object>)args.get('output');
      Map<String, Object> options = (Map<String, Object>)args.get('options');
      return invokeMethod(action, input, output, options);
    }

    global boolean invokeMethod(String action, Map<String,Object> inputMap, Map<String,Object> outputMap, Map<String, Object> optionsmap){
        boolean isSucess = false;
        try{
            if(action == 'validateContact'){
                validateContact(inputMap, outputMap);
                isSucess = true;
            }
        }catch(Exception ex){
            System.debug('Exception in OmniController: ' + ex.getMessage());    
        }
        return isSucess;
    }

    private static void validateContact(Map<String,Object> inputMap, Map<String,Object> outputMap){
        boolean isDuplicate = false;
        try{
            Set<String> emailSet = new Set<String>();
            Set<String> phoneSet = new Set<String>();
            List<Object> contactList = (List<Object>)inputMap.get('contactList');
            List<Map<String,Object>> contactMapList = new List<Map<String,Object>>();

            for(Object item : contactList){
                contactMapList.add((Map<String,Object>)item);
            }
            for(Map<String,Object> con : contactMapList){
                String email = (String) con.get('Email');
                String phone = (String) con.get('Phone');

                if(String.isNotBlank(email)){
                   if(!emailSet.add(email.trim().toLowerCase())){
                       isDuplicate = true;
                   }
                }

                if(String.isNotBlank(phone)){
                    if(!phoneSet.add(phone.trim().toLowerCase())){
                        isDuplicate = true;
                    }
                }
            }  
        }catch(Exception ex){
            System.debug('Exception in validateContact: ' + ex.getMessage());
        }
        outputMap.put('isDuplicateC', isDuplicate);

    }
}