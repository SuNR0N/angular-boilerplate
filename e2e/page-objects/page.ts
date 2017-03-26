import { browser, element, by, ElementFinder, promise, Key } from 'protractor';

import { NavComponentPage } from './components/nav.component.page';

export abstract class PageObject {
    private _url: string;
    private _menu: NavComponentPage;

    constructor(url: string) {
        this._url = url;
        this._menu = new NavComponentPage();
    }

    public get menu() {
        return this._menu;
    }

    getTitle() {
        return browser.getTitle();
    }

    navigate() {
        return browser.get(this._url);
    }

    reload() {
        return browser.refresh();
    }

    clearByChar(el: ElementFinder) {
        return el.getAttribute('value').then((text) => {
            let len = text.length;
            let backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
            return el.sendKeys(backspaceSeries);
        });
    }

    getFirstToast() {
        return element(by.css('#toast-container .toast:first-child'));
    }

    getFirstErrorToast() {
         return element(by.css('#toast-container .toast-error:first-child'));
    }

    getFirstInfoToast() {
        return element(by.css('#toast-container .toast-info:first-child'));
    }

    getFirstSuccessToast() {
        return element(by.css('#toast-container .toast-success:first-child'));
    }

    getFirstWarningToast() {
        return element(by.css('#toast-container .toast-warning:first-child'));
    }

    getToastbyTitle(title: string) {
        return element(by.cssContainingText('#toast-container .toast .toast-title', title));
    }

    getToastbyMessage(message: string) {
        return element(by.cssContainingText('#toast-container .toast .toast-message', message));
    }
}
