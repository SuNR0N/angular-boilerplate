import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { PageObject } from '../page';
import { PagerComponentPage } from '../components/pager.component.page';

const pageUrl = '/books';

export class BookListComponentPage extends PageObject {
    private _searchInput: ElementFinder;
    private _books: ElementArrayFinder;
    private _pager: PagerComponentPage;

    constructor() {
        super(pageUrl);
        this._searchInput = element(by.id('search-input'));
        this._books = element.all(by.css('tr'));
        this._pager = new PagerComponentPage('books-pager');
    }

    public get searchInput() {
        return this._searchInput;
    }

    public get books() {
        return this._books;
    }

    public get pager() {
        return this._pager;
    }

    clearSearchInput() {
        return this._searchInput.clear();
    }

    setSearchInput(val: string) {
        return this.clearSearchInput().then(() => this._searchInput.sendKeys(val));
    }

    getRowByIndex(index: number) {
        return {
            isbnCell: () => element(by.css(`tr:nth-child(${index}) > td:nth-child(1)`)),
            titleCell: () => element(by.css(`tr:nth-child(${index}) > td:nth-child(2)`)),
            authorCell: () => element(by.css(`tr:nth-child(${index}) > td:nth-child(3)`)),
            publicationDateCell: () => element(by.css(`tr:nth-child(${index}) > td:nth-child(4)`)),
            viewButton: () => element(by.css(`tr:nth-child(${index})`)).element(by.cssContainingText('button', 'View')),
            editButton: () => element(by.css(`tr:nth-child(${index})`)).element(by.cssContainingText('button', 'Edit')),
            deleteButton: () => element(by.css(`tr:nth-child(${index})`)).element(by.cssContainingText('button', 'Delete')),
        };
    }

    getRowByISBN(isbn: string) {
        return {
            isbnCell: () => element(by.id(`${isbn}-isbn`)),
            titleCell: () => element(by.id(`${isbn}-title`)),
            authorCell: () => element(by.id(`${isbn}-author`)),
            publicationDateCell: () => element(by.id(`${isbn}-publication-date`)),
            viewButton: () => element(by.id(`${isbn}-view-button`)),
            editButton: () => element(by.id(`${isbn}-edit-button`)),
            deleteButton: () => element(by.id(`${isbn}-delete-button`))
        };
    }

    clickViewButtonByRowIndex(index: number) {
        return this.getRowByIndex(index).viewButton().click();
    }

    clickViewButtonByISBN(val: string) {
        return this.getRowByISBN(val).viewButton().click();
    }

    clickEditButtonByRowIndex(index: number) {
        return this.getRowByIndex(index).editButton().click();
    }

    clickEditButtonByISBN(val: string) {
        return this.getRowByISBN(val).editButton().click();
    }

    clickDeleteButtonByRowIndex(index: number) {
        return this.getRowByIndex(index).deleteButton().click();
    }

    clickDeleteButtonByISBN(val: string) {
        return this.getRowByISBN(val).deleteButton().click();
    }
}
