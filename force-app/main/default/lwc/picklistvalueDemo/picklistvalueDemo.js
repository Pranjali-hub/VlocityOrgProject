import { LightningElement, wire} from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';


export default class PicklistvalueDemo extends LightningElement {

    industryOptions =[];
    selectedIndustry ='';

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT})
    accountObjectInfo

    @wire(getPicklistValues,{recordTypeId :'$accountObjectInfo.data.defaultRecordTypeId',fieldApiName: ACCOUNT_INDUSTRY})
    industryPicklistValues({data,error}){
        if(data){
            this.industryOptions = [...this.generatePicklistOptions(data)];
        } else if(error){
            console.error('Error fetching picklist values: ', error);
}   
    }

    generatePicklistOptions(data){
        return data.values.map(item =>({
            label: item.label,
            value: item.value
        }));
    }
    
    handleChange(event){
        this.selectedIndustry = event.detail.value;
    }

    
}