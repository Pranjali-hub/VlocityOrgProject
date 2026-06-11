import { LightningElement, wire } from 'lwc';
import getContactsList from '@salesforce/apex/RefreshContactController.getContactsList';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


 const columns = [
    { label: 'FirstName', fieldName: 'FirstName' , editable: true},
    { label: 'LastName', fieldName: 'LastName' ,editable: true},
    ];

export default class RefreshDemo extends LightningElement {

    columns = columns;
    draftValues = [];
    
    @wire(getContactsList)
    contacts;

    get isContactAvailable(){
        console.log('contacts data ', this.contacts);
        return this.contacts.data && this.contacts.data.length > 0 ? 'Yes' : 'No';
    }
    
    handleSave(event){
        this.draftValues = event.detail.draftValues;    
        const recordInput = event.detail.draftValues.slice().map(draft => {
            console.log('draft ', draft);
            const fields = Object.assign({}, draft);
            return {fields};

        })
        console.log('recordInput ', recordInput);

        const promises = recordInput.map(record => updateRecord(record));
        Promise.all(promises).then(res =>{
            this.showToastMsg('Success', 'Records updated successfully');
            this.draftValues = [];
            return refreshApex(this.contacts);
        }).catch(error =>{
            this.showToastMsg('Error Creating Records', error.body.message, 'error');
        })
    }

    showToastMsg(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title : title,
            message: message,
            variant : variant||'success'
        }));
    }

}