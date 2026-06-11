import { LightningElement } from 'lwc';
import MealImage from "@salesforce/resourceUrl/MealImage";

export default class MealSearch extends LightningElement {
    searchkey ='';

    handleChange(event){
        this.searchKey = event.target.value;
    }   

    handleClick(event){  
        let searchEvent = new CustomEvent('searchmeal',{
            detail : this.searchKey
        });
        this.dispatchEvent(searchEvent);    
    }
    

}