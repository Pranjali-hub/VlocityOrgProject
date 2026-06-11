
public class QueuableApexEample implements Queueable {

    private List<Account> accList;  
    private Id parentAccountId;

    public QueuableApexEample(List<Account> accList, Id parentAccountId){
        this.accList = accList;
        this.parentAccountId = parentAccountId;
    }

    public void execute(QueueableContext context){
        for(Account acc : accList){
            acc.ParentId = parentAccountId; 
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
    
}