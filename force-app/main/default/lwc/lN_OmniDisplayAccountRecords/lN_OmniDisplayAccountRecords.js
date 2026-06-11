import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Billing State', fieldName: 'BillingState' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Type', fieldName: 'Type' },
    {label : 'Analyzed Account', fieldName : 'AnalyzedIndicator', type : 'boolean', editable: true},
    {label : 'Analyzed Status', fieldName : 'AnalyzedStatus', type : 'picklistColumn', initialWidth :200,
        editable: {
            fieldName : 'controlEditForAnalyzedStatus'
        },
        cellAttributes: {
            class: { fieldName: 'customCSSAnalyzedStatus'}
        },
        typeAttributes: {
            placeholder: 'Select Status',
            options : {fieldName : 'picklistOptionsForAnalyzedStatus'},
            label : { fieldName: 'AnalyzedStatus' },
            value : { fieldName: 'AnalyzedStatus' }
        },
    },
    {label : 'Analyzed Account Type', fieldName : 'AnalyzedAccountType', type : 'picklistColumn', initialWidth :200,
        editable: {
            fieldName : 'controlEditForAnalyzedAccountType'
        },
        cellAttributes: {
            class: { fieldName: 'customCSSAnalyzedAccountType'}

        },
        typeAttributes: {
            placeholder: 'Select Account Type',
            options : {fieldName : 'picklistOptionsForAnalyzedAccountType'},
            label : { fieldName: 'AnalyzedAccountType' },
            value : { fieldName: 'AnalyzedAccountType' }
        },  
    },  
    {label : 'SecCodes', fieldName : 'SecCodes', type : 'multiselectpicklistColumn', editable: true},
];

export default class LN_OmniDisplayAccountRecords extends OmniscriptBaseMixin(LightningElement) {
    accountData = [];
    tempData = [];
    data =[];
    initialData = [];
    columns = columns;
    searchKey = '';
    filterColumns = ['Name'];
    draftValues = [];

    picklistOptionsForAnalyzedStatus =[{
        "label": "Force To Analyzed",
        "value": "Force To Analyzed",
        "required": true
    },
    {
        "label": "Flip To Analyzed ",
        "value": "Flip To Analyzed ",
        "required": true
    }];

    picklistOptionsForAnalyzedAccountType =[{
        "label" : "151 - Business Banking Checking",
        "value" : "151 - Business Banking Checking",
        "required": true
    },
    {
        "label" : "152 - Commercial Checking",
        "value" : "152 - Commercial Checking",
        "required": true
    }];


    connectedCallback() {
        console.log('Connected Callback called');
        this.tempData = JSON.parse(JSON.stringify(this.omniJsonData.AccountDataList));
        console.log('Account Data:' +JSON.stringify(this.data));

        this.tempData.forEach(item => {
            item.picklistOptionsForAnalyzedStatus = this.picklistOptionsForAnalyzedStatus;
            item.picklistOptionsForAnalyzedAccountType = this.picklistOptionsForAnalyzedAccountType;
            if(this.isBlank(item.AnalyzedStatus)){
                item.AnalyzedStatus = '';
            }
            if(this.isBlank(item.AnalyzedAccountType)){
                item.AnalyzedAccountType = '';
            }
            item.updatedStatus = false;

            //Check For analyzed indicator
            if(item.AnalyzedIndicator){
                item.controlEditForAnalyzedStatus = false;
                item.customCSSAnalyzedStatus = 'cellGreyedOut';
            }else{
                item.controlEditForAnalyzedStatus = true;
                item.customCSSAnalyzedStatus = '';
            }

            if(item.AnalyzedIndicator || (item.AnalyzedStatus == undefined || item.AnalyzedStatus == null || item.AnalyzedStatus == ''|| item.AnalyzedStatus == 'Force To Analyzed')){
                item.controlEditForAnalyzedAccountType = false;
                item.customCSSAnalyzedAccountType = 'cellGreyedOut';
            }else{
                item.controlEditForAnalyzedAccountType = true;
                item.customCSSAnalyzedAccountType = '';
            }
        });
        this.data = this.tempData;
        this.initialData = this.data;        
    }

    isBlank(val){
        return val === undefined || val === null || val === '';
    }

    handleSearch(event){
        this.searchkey = event.target.value;
        console.log('Search Key:' + this.searchkey);
        this.data =  this.initialData.filter(item  => {
            return this.filterColumns.some(column => {
                return item[column]?.toLowerCase().includes(this.searchkey.toLowerCase());
            });
        });
    }

    handleSave(event){
        this.draftValues = event.detail.draftValues;
        console.log('Draft Values:' + JSON.stringify(this.draftValues));
        const modifiedData = this.data.map(item => {
            const modifiedRecord  = this.draftValues.find(record => record.Id === item.Id);
            const updatedRecord = {...item, ...modifiedRecord};
            return updatedRecord;
        });
        console.log('Modified Data:' + JSON.stringify(modifiedData));
        this.data = modifiedData;
        this.draftValues = [];  
    }

    handleCancel(){
        this.draftValues = [];
    }
}