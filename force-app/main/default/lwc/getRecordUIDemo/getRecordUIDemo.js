import { LightningElement, wire, api } from 'lwc';
import {createRecord, updateRecord} from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {getListUi} from 'lightning/uiListApi';

 const colums=[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Email', fieldName: 'Email', type: 'email', editable: true},
    {label: 'Phone', fieldName: 'Phone', editable: true},
];


export default class GetRecordUIDemo extends LightningElement {

    @api recordId;
    contactData =[];
    columns = colums;
    draftValues = [];
    formData = {};


    
    @wire(getListUi, {objectApiName: CONTACT_OBJECT, listViewApiName: 'AllContacts'})
    getContactsList({data, error}){
        if(data){
            console.log('Contacts List: ', data);
            this.contactData = data.records.records.map(item => {
                return {
                    "Id" : this.getValue(item, 'Id'),
                    "Name" : this.getValue(item, 'Name'),
                    "Email" : this.getValue(item, 'Email'),
                    "Phone" : this.getValue(item, 'Phone')
                }
            })
        }
        if(error){
            console.error('Error fetching contacts list: ', error);
        }   
    }

    

    handleInputChange(event){
        const {name, value} = event.target;
        this.formData = {...this.formData, [name]: value};
    }

    handleSubmit(){
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName,
            fields: {
                ...this.formData,
                AccountId: this.recordId
            }
        };
        createRecord(recordInput)
        .then(result => {
            this.ShowToastEvent('Success!!!', 'Contact created successfully');
            this.template.querySelector('form.createForm').reset();
            this.formData = {};
        }).catch(error =>{
            this.ShowToastEvent('Error creating contact', error.body.message, 'error');

        });
    }   

    getValue(data,field){
        return data?.fields?.[field]?.value || '';

    }

    handleSave(event){
        console.log('Draft Values: ', event.detail);
        const recordInput = event.detail.draftValues.map(item =>{
            const fields = {...item};
            return { fields : fields}
        })
        const updatePromises = recordInput.map(rec => updateRecord(rec));
        Promise.all(updatePromises)
        .then(() => {
            this.ShowToastEvent('Success!!!', 'Contact updated successfully');
            this.draftValues = [];
        }).catch(error =>{
            this.ShowToastEvent('Error updating contact', error.body.message, 'error');

        }); 
    }

    ShowToastEvent(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant : variant || 'success'
        }))
    }
}