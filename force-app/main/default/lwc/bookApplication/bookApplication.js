import { LightningElement } from 'lwc';

const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699';

export default class BookApplication extends LightningElement {

    query = 'isbn:0747532699';
    books = [];
    connectedCallback() {
        this.fetchBookData();
    }

    fetchBookData() {
        fetch(BOOK_URL+this.query)
        .then(response => response.json())
        .then(data => {
            console.log('Book Data:', data);
            this.books = data;
        })
        .catch(error => {
            console.error('Error fetching book data:', error);
        });
    }
}