import { LightningElement } from 'lwc';

export default class MealHunter extends LightningElement {

    searchResults;

    async handleSearchMeal(event){
        let searchmeal = event.detail;  
        console.log('Search Meal : ' ,searchmeal);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchmeal}`);
        let data = await response.json();
        console.log('Meal Data :' ,data.meals);

        this.searchResults = data.meals;



    }
}