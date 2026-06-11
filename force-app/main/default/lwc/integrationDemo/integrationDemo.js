import { LightningElement } from 'lwc';
import getLeadInformation from '@salesforce/apex/IntegrationController.RequestLeadInformation';

const columns = [
        { label: 'Lead Name', fieldName: 'Name' },
        { label: 'Company', fieldName: 'Company' },
        { label: 'Email', fieldName: 'Email' },
        {label: 'Phone', fieldName: 'Phone'},
        
    ];

export default class IntegrationDemo extends LightningElement {
    leadName = '';
    leadData = [];
    columns = columns;  
   
    connectedCallback() {

    }

    handleLeadChange(event) {
        this.leadName = event.target.value;
        console.log('Lead Name:', this.leadName);
    }

    getLeadInformation(){
        getLeadInformation({ leadName: this.leadName })
        .then(result => {
            this.leadData = result.map(item => ({
                    Id: item.Id,
                    Name: item.Name,    
                    Email: item.Email,
                    Phone: item.Phone,
                    Company: item.Company
                }));
                console.log('Table Data:', JSON.stringify(this.leadData));
        })
        .catch(error => {
            console.error(error);
        });
        
    }

}
