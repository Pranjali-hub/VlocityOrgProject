import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';  
import NAME_FIELD from '@salesforce/schema/Contact.Name';   
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';     
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'; 
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';

    
export default class RecordEditForm extends LightningElement {

    objectApiName = CONTACT_OBJECT;
    
    fields ={
        nameField : NAME_FIELD,
        emailField : EMAIL_FIELD,
        phoneField : PHONE_FIELD,
        titleField : TITLE_FIELD,
        accountIdField : ACCOUNTID_FIELD        
    }
    handleReset(event){
        const inputfields =this.template.querySelectorAll('lightning-input-field');
        console.log('inputfields>>',inputfields);
        if(inputfields){
            Array.from(inputfields).forEach(field =>{
                field.reset();
            });
        }
    }
}