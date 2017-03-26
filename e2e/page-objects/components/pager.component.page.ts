import { element, by, ElementFinder } from 'protractor';

import { PageObject } from '../page';

export class PagerComponentPage {
    private _pager: ElementFinder;
    private _firstPageItem: ElementFinder;
    private _firstPageLink: ElementFinder;
    private _previousPageItem: ElementFinder;
    private _previousPageLink: ElementFinder;
    private _progress: ElementFinder;
    private _currentPage: ElementFinder;
    private _totalPages: ElementFinder;
    private _nextPageItem: ElementFinder;
    private _nextPageLink: ElementFinder;
    private _lastPageItem: ElementFinder;
    private _lastPageLink: ElementFinder;

    constructor(id: string) {
        this._pager = element(by.css(`nav#${id}`));
        this._firstPageItem = element(by.id(`${id}-first-page-item`));
        this._firstPageLink = element(by.id(`${id}-first-page-link`));
        this._previousPageItem = element(by.id(`${id}-previous-page-item`));
        this._previousPageLink = element(by.id(`${id}-previous-page-link`));
        this._progress = element(by.id(`${id}-progress`));
        this._currentPage = element(by.id(`${id}-current-page`));
        this._totalPages = element(by.id(`${id}-total-pages`));
        this._nextPageItem = element(by.id(`${id}-next-page-item`));
        this._nextPageLink = element(by.id(`${id}-next-page-link`));
        this._lastPageItem = element(by.id(`${id}-last-page-item`));
        this._lastPageLink = element(by.id(`${id}-last-page-link`));
    }

    public get pager() {
        return this._pager;
    }

    public get firstPageItem() {
        return this._firstPageItem;
    }

    public get firstPageLink() {
        return this._firstPageLink;
    }

    public get previousPageItem() {
        return this._previousPageItem;
    }

    public get previousPageLink() {
        return this._previousPageLink;
    }

    public get progress() {
        return this._progress;
    }

    public get currentPage() {
        return this._currentPage;
    }

    public get totalPages() {
        return this._totalPages;
    }

    public get nextPageItem() {
        return this._nextPageItem;
    }

    public get nextPageLink() {
        return this._nextPageLink;
    }

    public get lastPageItem() {
        return this._lastPageItem;
    }

    public get lastPageLink() {
        return this._lastPageLink;
    }

    clickFirst() {
        return this._firstPageLink.click();
    }

    clickPrevious() {
        return this._previousPageLink.click();
    }

    clickNext() {
        return this._nextPageLink.click();
    }

    clickLast() {
        return this._lastPageLink.click();
    }
}
