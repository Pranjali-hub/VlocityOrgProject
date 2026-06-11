import { LightningElement,wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from '@salesforce/schema/Account'; 
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type'; 
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';




export default class LWCPractice extends OmniscriptBaseMixin(LightningElement)  {



    columnsData =[
        { label: 'Account name', fieldName: 'Name', type: 'text' },
        { label: 'Account Number', fieldName: 'AccountNumber', type: 'Number'},
        { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency',editable: true  },
        { label: 'Active', fieldName: 'Active', type: 'text',editable: true  },
        { label: 'Type', fieldName: 'Type', type: 'picklist', editable: true, 
            typeAttributes: 
            { options: { fieldName: 'TypeOptions' },
            value: { fieldName: 'Type' },
         }}
            
    ];


    data=[];
    tempData =[];
    omniJsonData;
    columns;
    draftDataRows;
    draftValues = [];
    selectedRows = [];
    type_Options =[];

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: 'Account.Type' })
    getAccountTypePicklistValues({error, data}){    
        if(data){
            
            this.type_Options = data.values.map(item=>{
                item.label = item.label;
                item.value = item.value;
                return item;
            });

            console.log('type_Options==='+JSON.stringify(this.type_Options));
        }else if(error){
            console.log('Error==='+JSON.stringify(error));
        }       
    }

        
  
    connectedCallback() {
        this.tempData = JSON.parse(JSON.stringify(this.omniJsonData.AccountData));
        this.columns = this.columnsData;
        this.data = this.tempData;
        this.sentToOmni();

    }

    handleRowSelection(event){
        this.selectedRows = event.detail.selectedRows;
        this.draftValues = this.selectedRows;
        console.log('Selected Rows==='+JSON.stringify(this.selectedRows));

    }
    handleSave(event){
        
    }
    handleSearch(event){
        const searchKey = event.target.value.toLowerCase();
    }
    
    sentToOmni(){
        this.omniUpdateDataJson(this.data);
    }

        
 

    

}