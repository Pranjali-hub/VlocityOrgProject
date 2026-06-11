import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";

export default class NavigationServiceDemo extends NavigationMixin(LightningElement){

    @api recordId

    navigateToHome(){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName : 'home'
            }
        })
    }
    navigateToChatter(){
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName : 'chatter'
            }
        })
    }
    navigateToNewRecord(){
        const defaultvalue = encodeDefaultFieldValues({
            FirstName : "Zero",
            LastName : "Hero",
            LeadSource : "Other"
        })
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'new'
            },
            state:{
                defaultFieldValues : defaultvalue
            }
        })
    }

    navigateToList(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'list'
            },
            state :{
                filterName : 'Recent'
            }
        })
    }
    
    navigateToFile(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'ContentDocument',
                actionName : 'home'
            }
        })

    }


}