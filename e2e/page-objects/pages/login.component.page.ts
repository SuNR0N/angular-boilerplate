import { element, by, ElementFinder } from 'protractor';

import { PageObject } from '../page';

const pageUrl = '/login';

export class LoginComponentPage extends PageObject {
    private _header: ElementFinder;
    private _inputUsername: ElementFinder;
    private _inputPassword: ElementFinder;
    private _loginButton: ElementFinder;

    constructor() {
        super(pageUrl);
        this._header = element(by.css('h2'));
        this._inputUsername = element(by.id('input-username'));
        this._inputPassword = element(by.id('input-password'));
        this._loginButton = element(by.id('login-button'));
    }

    public get header(): ElementFinder {
        return this._header;
    }

    public get inputUsername(): ElementFinder {
        return this._inputUsername;
    }

    public get inputPassword(): ElementFinder {
        return this._inputPassword;
    }

    public get loginButton(): ElementFinder {
        return this._loginButton;
    }

    setUsername(val: string) {
        this.clearUsername().then(() => this._inputUsername.sendKeys(val));
    }

    setPassword(val: string) {
        this.clearPassword().then(() => this._inputPassword.sendKeys(val));
    }

    clearUsername() {
        return this.clearByChar(this._inputUsername);
    }

    clearPassword() {
        return this.clearByChar(this._inputPassword);
    }

    login() {
        return this._loginButton.click();
    }
}
