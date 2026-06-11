import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LdsExamples extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, INDUSTRY_FIELD, ANNUAL_REVENUE_FIELD, TYPE_FIELD];

    handleSuccess(event) {
        const recordId = event.detail.id;
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Record created with Id: ' + recordId,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    handleError(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Error',
            message: 'An error occurred while creating the record.',
            variant: 'error'
        });
        this.dispatchEvent(toastEvent);
    }
}


