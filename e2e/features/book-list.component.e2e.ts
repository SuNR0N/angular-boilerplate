import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { browser, ExpectedConditions } from 'protractor';
import { BookListComponentPage } from '../page-objects/pages/book-list.component.page';

let expect = chai.expect;
let bookListPage: BookListComponentPage;

chai.use(chaiAsPromised);

describe('BookList', () => {
    before(() => {
        bookListPage = new BookListComponentPage();
        bookListPage.navigate();
    });

    describe('on load', () => {
        it('should have a title', () => {
            expect(bookListPage.getTitle()).to.eventually.equal('Boilerplate Angular CRUD Application');
        });

        it('should display the search box', () => {
            expect(bookListPage.searchInput.isDisplayed()).to.eventually.be.ok;
        });

        it('should display the table containing 10 rows', () => {
            expect(bookListPage.books.count()).to.eventually.equal(10);
        });

        it('should display the pager', () => {
            expect(bookListPage.pager.pager.isDisplayed()).to.eventually.be.ok;
        });

        it('should display the View buttons for the books', () => {
            expect(bookListPage.getRowByIndex(1).viewButton().isDisplayed()).to.eventually.be.ok;
        });

        it('should not display the Edit buttons for the books', () => {
            expect(bookListPage.getRowByIndex(1).editButton().isPresent()).to.eventually.be.not.ok;
        });

        it('should not display the Delete buttons for the books', () => {
            expect(bookListPage.getRowByIndex(1).deleteButton().isPresent()).to.eventually.be.not.ok;
        });
    });

    describe('when testing the pager', () => {
        after(() => {
            bookListPage.pager.clickFirst();
        });

        describe('and checking its initial state', () => {
            it('should display 1 as the current page', () => {
                expect(bookListPage.pager.currentPage.getText()).to.eventually.to.equal('1');
            });

            it('should display the First button in a disabled state', () => {
                expect(bookListPage.pager.firstPageItem.getAttribute('class')).to.eventually.contain('disabled');
            });

            it('should display the Previous button in a disabled state', () => {
                expect(bookListPage.pager.previousPageItem.getAttribute('class')).to.eventually.contain('disabled');
            });

            it('should display the Next button in an enabled state', () => {
                expect(bookListPage.pager.nextPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should display the Last button in an enabled state', () => {
                expect(bookListPage.pager.lastPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });
        });

        describe('and clicking the Next button', () => {
            before(() => {
                bookListPage.pager.clickNext();
            });

            it('should navigate to the second page', () => {
                expect(bookListPage.pager.currentPage.getText()).to.eventually.to.equal('2');
            });

            it('should enable the First button', () => {
                expect(bookListPage.pager.firstPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should enable the Previous button', () => {
                expect(bookListPage.pager.previousPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should not disable the Next button', () => {
                expect(bookListPage.pager.nextPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should not disable the Last button', () => {
                expect(bookListPage.pager.lastPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });
        });

        describe('and clicking the Last button', () => {
            before(() => {
                bookListPage.pager.clickLast();
            });

            it('should navigate to the last page', () => {
                expect(bookListPage.pager.currentPage.getText()).to.eventually.to.equal('3');
                expect(bookListPage.pager.totalPages.getText()).to.eventually.to.equal('3');
            });

            it('should not disable the First button', () => {
                expect(bookListPage.pager.firstPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should not disable the Previous button', () => {
                expect(bookListPage.pager.previousPageItem.getAttribute('class')).to.eventually.not.contain('disabled');
            });

            it('should disable the Next button', () => {
                expect(bookListPage.pager.nextPageItem.getAttribute('class')).to.eventually.contain('disabled');
            });

            it('should disable the Last button', () => {
                expect(bookListPage.pager.lastPageItem.getAttribute('class')).to.eventually.contain('disabled');
            });
        });
    });

    describe('when testing the search box', () => {
        describe('and searching for a term which has more matches than one page', () => {
            before(() => {
                let queryMatchesFirstRow = ExpectedConditions.textToBePresentInElement(
                    bookListPage.getRowByIndex(1).titleCell(),
                    'Building'
                );
                bookListPage.setSearchInput('d');
                browser.wait(queryMatchesFirstRow, 5000);
            });

            it('should filter the search results properly', () => {
                expect(bookListPage.books.count()).to.eventually.equal(10);
            });

            it('should display the pager', () => {
                expect(bookListPage.pager.pager.isPresent()).to.eventually.be.ok;
            });

            it('should display 2 pages in total', () => {
                expect(bookListPage.pager.totalPages.getText()).to.eventually.be.equal('2');
            });
        });

        describe('and searching for a term which has less matches than one page', () => {
            before(() => {
                let queryMatchesFirstRow = ExpectedConditions.textToBePresentInElement(
                    bookListPage.getRowByIndex(1).titleCell(),
                    'ng-book'
                );
                bookListPage.setSearchInput('angular');
                browser.wait(queryMatchesFirstRow, 5000);
            });

            it('should filter the search results properly', () => {
                expect(bookListPage.books.count()).to.eventually.equal(3);
            });

            it('should not display the pager', () => {
                expect(bookListPage.pager.pager.isPresent()).to.eventually.not.be.ok;
            });
        });

        describe('and searching for a term which has no matches', () => {
            before(() => {
                let firstRowDoesNotExist = ExpectedConditions.not(
                    ExpectedConditions.presenceOf(bookListPage.getRowByIndex(1).isbnCell())
                );
                bookListPage.setSearchInput('angularx');
                browser.wait(firstRowDoesNotExist, 5000);
            });

            it('should not display any results', () => {
                expect(bookListPage.books.count()).to.eventually.equal(0);
            });

            it('should not display the pager', () => {
                expect(bookListPage.pager.pager.isPresent()).to.eventually.not.be.ok;
            });
        });
    });

    describe('when clicking the View button of a book', () => {
        before(() => {
            bookListPage.reload();
        });

        it('should navigate to the View page of the book', () => {
            bookListPage.clickViewButtonByRowIndex(1);

            expect(browser.driver.getCurrentUrl()).to.eventually.match(/books\/\d{9}(X|\d)$|^\d{13}$/);
        });
    });
});
