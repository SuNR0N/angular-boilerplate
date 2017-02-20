import { browser } from 'protractor';

export abstract class PageObject {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    getTitle(): any {
        return browser.getTitle();
    }

    navigate(): void {
        browser.get(this.url);
    }
}
