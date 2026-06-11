import { LightningElement } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

export default class LNLWCHandsOnByAnkit extends LightningElement {
    opportunities = [];

    connectedCallback() {
        this.fetchOpportunities();
    }

    async fetchOpportunities() {
        try {
            this.opportunities = await getOpportunities();
            console.log('Opportunities fetched successfully:', this.opportunities);
        } catch (error) {
            console.error('Error fetching opportunities:', error);
        }
    }
}