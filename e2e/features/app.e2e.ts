import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { AppPage } from '../pages/app.page';

let expect = chai.expect;
let appPage: AppPage;

chai.use(chaiAsPromised);

describe('App', () => {
    before(() => {
        appPage = new AppPage();
        appPage.navigate();
    });

    it('should have a title', () => {
        expect(appPage.getTitle()).to.eventually.equal('Boilerplate Angular CRUD Application');
    });

    it('should have a header', () => {
        expect(appPage.getHeader().getText()).to.eventually.equal('Hello World');
    });
});
