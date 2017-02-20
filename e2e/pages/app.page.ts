import { element, by, ElementFinder } from 'protractor';

import { PageObject } from './page';

export class AppPage extends PageObject  {
    private header: ElementFinder;

    constructor() {
        super('/');
        this.header = element(by.css('h1'));
    }

    getHeader():ElementFinder {
        return this.header;
    }
}
