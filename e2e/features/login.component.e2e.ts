import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { browser, ExpectedConditions } from 'protractor';
import { LoginComponentPage } from '../page-objects/pages/login.component.page';

let expect = chai.expect;
let loginPage: LoginComponentPage;

chai.use(chaiAsPromised);

describe('Login', () => {
    before(() => {
        loginPage = new LoginComponentPage();
        loginPage.navigate();
    });

    describe('on load', () => {
        it('should have a title', () => {
            expect(loginPage.getTitle()).to.eventually.equal('Boilerplate Angular CRUD Application');
        });

        it('should display the header', () => {
            expect(loginPage.header.getText()).to.eventually.equal('Sign In');
        });

        it('should display the Username field', () => {
            expect(loginPage.inputUsername.isPresent()).to.eventually.be.ok;
        });

        it('should display the Password field', () => {
            expect(loginPage.inputPassword.isPresent()).to.eventually.be.ok;
        });

        it('should display the Login button in a disabled state', () => {
            expect(loginPage.loginButton.isDisplayed()).to.eventually.be.ok;
            expect(loginPage.loginButton.isEnabled()).to.eventually.not.be.ok;
        });
    });

    describe('given the Login Form is not complete', () => {
        beforeEach(() => {
            loginPage.clearUsername().then(() => loginPage.clearPassword());
        });

        it('should not enable the Login button if only the Username was provided', () => {
            loginPage.setUsername('Test User');

            expect(loginPage.loginButton.isEnabled()).to.eventually.not.be.ok;
        });

        it('should not enable the Login button if only the Password was provided', () => {
            loginPage.setPassword('Password');

            expect(loginPage.loginButton.isEnabled()).to.eventually.not.be.ok;
        });
    });

    describe('given the form is complete and the trying to login with an invalid credential', () => {
        it('should display an error', () => {
            loginPage.setUsername('john.doe');
            loginPage.setPassword('password');

            loginPage.login();
        });
    });

    describe('given the form is complete and the trying to login with a valid credential', () => {
        it('should navigate to the Books page', () => {
            loginPage.setUsername('john.doe');
            loginPage.setPassword('password123');

            loginPage.login();

            let urlChanged = ExpectedConditions.not(ExpectedConditions.urlContains('login'));
            browser.wait(urlChanged, 5000);

            expect(browser.driver.getCurrentUrl()).to.eventually.to.match(/books$/);
        });
    });
});
