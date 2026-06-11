import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import getCases from '@salesforce/apex/CaseController.getCases';

const columns = [
    { label: 'Case Number', fieldName: 'caseNumber' },
    { label: 'Subject', fieldName: 'subject' },
    { label: 'Status', fieldName: 'status' },
    { label: 'Priority', fieldName: 'priority' },
    { label: 'Owner', fieldName: 'ownerName' },
];

export default class CaseDashboard extends LightningElement {

    caseData = [];
    statusOptions = [];
    ownerOptions = [];
    columns = columns;

    statusValue = '';
    ownerValue = '';

    // Get object metadata
    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo;

    // Get picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: STATUS_FIELD
    })
    wiredStatusPicklist({ error, data }) {
        if (data) {
            this.statusOptions = data.values.map(option => ({
                label: option.label,
                value: option.value
            }));
        } else if (error) {
            console.error('Error fetching status picklist values:', error);
        }
    }


    get isDataEmpty() {
        return this.caseData.length === 0;
    }

    connectedCallback() {
        this.fetchCases();
    }

    async fetchCases() {
        try {
            let cases = await getCases();
            this.caseData = cases.map(item => ({
                Id: item.Id,
                caseNumber: item.CaseNumber,
                subject: item.Subject,
                status: item.Status,
                priority: item.Priority,
                ownerId: item.OwnerId,
                ownerName: item.Owner.Name,
            }));
            this.setOwnerOptios();
        } catch (error) {
            console.error('Error fetching cases:', error);
        }

    }

    setOwnerOptios() {
        const owner = this.caseData.map(item => item.ownerId);
        const uniqueOwner = [...new Set(owner)];
        let ownerOptions = uniqueOwner.map(item => {
            let ownerWithCaseRec = this.caseData.find(caseRecord => caseRecord.ownerId === item);
            let ownerName = ownerWithCaseRec ? ownerWithCaseRec.ownerName : 'Unknown';
            return {
                label: ownerName,
                value: item
            };
        })
        let defaultOption = { label: 'All Owners', value: '' };
        this.ownerOptions = [defaultOption, ...ownerOptions];
        console.log('Owner Options:', this.ownerOptions);
    }



}