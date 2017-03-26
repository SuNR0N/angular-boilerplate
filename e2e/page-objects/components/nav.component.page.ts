import { element, by, ElementFinder } from 'protractor';

import { PageObject } from '../page';

export class NavComponentPage {
    private _allBooksMenu: ElementFinder;
    private _createBookMenu: ElementFinder;
    private _loginMenu: ElementFinder;
    private _logoutMenu: ElementFinder;
    private _resetDataMenu: ElementFinder;

    constructor() {
        this._allBooksMenu = element(by.id('all-books-menu'));
        this._createBookMenu = element(by.id('create-book-menu'));
        this._loginMenu = element(by.id('login-menu'));
        this._logoutMenu = element(by.id('logout-menu'));
        this._resetDataMenu = element(by.id('reset-data-menu'));
    }

    public get allBooksMenu(): ElementFinder {
        return this._allBooksMenu;
    }

    public get resetDataMenu(): ElementFinder {
        return this._resetDataMenu;
    }

    public get createBookMenu(): ElementFinder {
        return this._createBookMenu;
    }

    public get loginMenu(): ElementFinder {
        return this._loginMenu;
    }

    public get logoutMenu(): ElementFinder {
        return this._logoutMenu;
    }

    clickAllBooksMenu() {
        return this._allBooksMenu.click();
    }

    clickCreateBookMenu() {
        return this._createBookMenu.click();
    }

    clickLoginMenu() {
        return this._loginMenu.click();
    }

    clickLogoutMenu() {
        return this._logoutMenu.click();
    }

    clickResetDataMenu() {
        return this._resetDataMenu.click();
    }
}
