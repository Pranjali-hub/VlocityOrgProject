import { LightningElement } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts';



export default class ApexImperativeDemo extends LightningElement {

    accounts=[];

    handleGetAccounts(){
        getAllAccounts()
        .then(result => {
            console.log('Accounts: ', result);
            this.accounts = result;
        }).catch(error => {
            console.error('Error fetching accounts: ', error);
        });

    }
}