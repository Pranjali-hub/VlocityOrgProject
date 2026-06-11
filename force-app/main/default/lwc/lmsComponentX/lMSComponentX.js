import { LightningElement, wire} from 'lwc';
import SMPLMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext, subscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class LMSComponentX extends LightningElement {

    @wire(MessageContext)
    context;

    receivedMessage = '';

    connectedCallback(){
        this.subscribeMessage();        
    }

    subscribeMessage(){
        subscribe(this.context, SMPLMC, (message) =>{this.handleMessage(message)}, {scope: APPLICATION_SCOPE});
    }

    handleMessage(message){
        this.receivedMessage = message.lmsData.value ? message.lmsData.value : 'No message received';
    }
}