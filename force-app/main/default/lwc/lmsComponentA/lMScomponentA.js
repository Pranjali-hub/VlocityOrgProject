import { LightningElement , wire} from 'lwc';
import SMPLMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext ,publish} from 'lightning/messageService';

export default class LMScomponentA extends LightningElement {

    @wire(MessageContext)
    context;

    inputValue = '';

    handleInputChange(event){
        this.inputValue = event.target.value;

    }

    handleClick(){
        const message = { 
            lmsData :{
                value : this.inputValue
            }
        }
        publish(this.context, SMPLMC, message);
    }
}