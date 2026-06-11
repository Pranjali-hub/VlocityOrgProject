import { LightningElement,wire,track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';

export default class ApexWireDemo extends LightningElement {

    @track accType ='';
    @wire(getAccounts, { accountType: '$accType' }) 
    accounts;
    accountTypeOptions = [];

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: ACCOUNT_TYPE })
    getAccountTypePicklist({error, data}){
        if(data){
            this.accountTypeOptions = data.values.map(item => {
                return { label: item.label, 
                         value: item.value };
            });
            console.log('Picklist values: ', this.accountTypeOptions);
        } else if(error){
            console.error('Error fetching picklist values: ', error);
        }
    }   

    handleChange(event){
        this.accType = event.target.value;
    }

}