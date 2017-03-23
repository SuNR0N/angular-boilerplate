import { expect } from 'chai';
import { spy, stub } from 'sinon';

import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagerComponent } from './pager.component';
import { IHATEOASPageResource } from '../../core/hateoas/hateoas-page-resource.model';

describe('PagerComponent', () => {
    let fixture: ComponentFixture<PagerComponent>;
    let comp: PagerComponent;
    let pager: DebugElement;
    let firstPageButton: DebugElement;
    let firstPageLink: DebugElement;
    let previousPageButton: DebugElement;
    let previousPageLink: DebugElement;
    let nextPageButton: DebugElement;
    let nextPageLink: DebugElement;
    let lastPageButton: DebugElement;
    let lastPageLink: DebugElement;
    let currentPage: DebugElement;
    let totalPages: DebugElement;
    let progress: DebugElement;
    let dummyPageResource;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PagerComponent
            ],
            providers: [],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PagerComponent);
        comp = fixture.componentInstance;
        comp.id = 'test';

        dummyPageResource = {
            hasAnyPagingRels: () => true,
            hasFirstPageRel: () => true,
            hasPreviousPageRel: () => true,
            hasNextPageRel: () => true,
            hasLastPageRel: () => true,
            getFirstPageRelName: () => null,
            getPreviousPageRelName: () => null,
            getNextPageRelName: () => null,
            getLastPageRelName: () => null
        };
        comp.pageResource = <IHATEOASPageResource<any>> dummyPageResource;
    });

    function refreshElements() {
        pager = fixture.debugElement.query(By.css(`#${comp.id}`));
        firstPageButton = fixture.debugElement.query(By.css(`#${comp.id}-first-page-item`));
        firstPageLink = fixture.debugElement.query(By.css(`#${comp.id}-first-page-link`));
        previousPageButton = fixture.debugElement.query(By.css(`#${comp.id}-previous-page-item`));
        previousPageLink = fixture.debugElement.query(By.css(`#${comp.id}-previous-page-link`));
        nextPageButton = fixture.debugElement.query(By.css(`#${comp.id}-next-page-item`));
        nextPageLink = fixture.debugElement.query(By.css(`#${comp.id}-next-page-link`));
        lastPageButton = fixture.debugElement.query(By.css(`#${comp.id}-last-page-item`));
        lastPageLink = fixture.debugElement.query(By.css(`#${comp.id}-last-page-link`));
        currentPage = fixture.debugElement.query(By.css(`#${comp.id}-current-page`));
        totalPages = fixture.debugElement.query(By.css(`#${comp.id}-total-pages`));
        progress = fixture.debugElement.query(By.css(`#${comp.id}-progress`));
    }

    it('should consruct the component properly', () => {
        expect(comp.onNavigate).to.be.instanceOf(EventEmitter);
    });

    it(`should default the 'firstButtonText' to 'First' when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> firstPageLink.nativeElement).textContent).to.be.equal('First');
    });

    it(`should set the 'firstButtonText' when provided`, () => {
        comp.firstButtonText = '<<';
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> firstPageLink.nativeElement).textContent).to.be.equal('<<');
    });

    it(`should default the 'previousButtonText' to 'Previous' when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> previousPageLink.nativeElement).textContent).to.be.equal('Previous');
    });

    it(`should set the 'previousButtonText' when provided`, () => {
        comp.previousButtonText = '<';
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> previousPageLink.nativeElement).textContent).to.be.equal('<');
    });

    it(`should default the 'nextButtonText' to 'Next' when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> nextPageLink.nativeElement).textContent).to.be.equal('Next');
    });

    it(`should set the 'nextButtonText' when provided`, () => {
        comp.nextButtonText = '>';
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> nextPageLink.nativeElement).textContent).to.be.equal('>');
    });

    it(`should default the 'lastButtonText' to 'Last' when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> lastPageLink.nativeElement).textContent).to.be.equal('Last');
    });

    it(`should set the 'lastButtonText' when provided`, () => {
        comp.lastButtonText = '>>';
        fixture.detectChanges();
        refreshElements();

        expect((<HTMLElement> lastPageLink.nativeElement).textContent).to.be.equal('>>');
    });

    it(`should default the 'showProgress' to true when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect(progress).to.be.ok;
    });

    it(`should not display the progress when 'showProgress' is set to false`, () => {
        comp.showProgress = false;
        fixture.detectChanges();
        refreshElements();

        expect(progress).to.be.not.ok;
    });

    it(`should default the 'showCurrentPage' to true when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect(currentPage).to.be.ok;
    });

    it(`should not display the current page when 'showCurrentPage' is set to false`, () => {
        comp.showCurrentPage = false;
        fixture.detectChanges();
        refreshElements();

        expect(currentPage).to.be.not.ok;
    });

    it(`should default the 'showTotalPages' to true when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect(totalPages).to.be.ok;
    });

    it(`should not display the total pages when 'showTotalPages' is set to false`, () => {
        comp.showTotalPages = false;
        fixture.detectChanges();
        refreshElements();

        expect(totalPages).to.be.not.ok;
    });

    it(`should default the 'showBoundaryLinks' to true when not provided`, () => {
        fixture.detectChanges();
        refreshElements();

        expect(firstPageButton).to.be.ok;
        expect(lastPageButton).to.be.ok;
    });

    it(`should not display the first and last links when 'showBoundaryLinks' is set to false`, () => {
        comp.showBoundaryLinks = false;
        fixture.detectChanges();
        refreshElements();

        expect(firstPageButton).to.be.not.ok;
        expect(lastPageButton).to.be.not.ok;
    });

    describe('hasAnyPages()', () => {
        it('should return false if there is no pageResource', () => {
            comp.pageResource = null;
            fixture.detectChanges();

            expect(comp.hasAnyPages()).to.be.not.ok;
        });

        it('should return false if there is a pageResource but it does not have any relations', () => {
            stub(dummyPageResource, 'hasAnyPagingRels').returns(false);
            fixture.detectChanges();

            expect(comp.hasAnyPages()).to.be.not.ok;
        });

        it('should return true if there is a pageResource with any paging relations', () => {
            stub(dummyPageResource, 'hasAnyPagingRels').returns(true);
            fixture.detectChanges();

            expect(comp.hasAnyPages()).to.be.ok;
        });
    });

    describe('hasFirstPage()', () => {
        it('should return false if there is no pageResource', () => {
            comp.pageResource = null;
            fixture.detectChanges();

            expect(comp.hasFirstPage()).to.be.not.ok;
        });

        it('should return false if there is a pageResource but it does not have a first relation', () => {
            stub(dummyPageResource, 'hasFirstPageRel').returns(false);
            fixture.detectChanges();

            expect(comp.hasFirstPage()).to.be.not.ok;
        });

        it('should return true if there is a pageResource with a first relation', () => {
            stub(dummyPageResource, 'hasFirstPageRel').returns(true);
            fixture.detectChanges();

            expect(comp.hasFirstPage()).to.be.ok;
        });
    });

    describe('goFirstPage()', () => {
        it(`should emit 'first'`, () => {
            const firstPageRelName = 'first';
            let onNavigateEmitSpy = spy(comp.onNavigate, 'emit');
            stub(dummyPageResource, 'getFirstPageRelName').returns(firstPageRelName);
            fixture.detectChanges();
            comp.goFirstPage();

            expect(onNavigateEmitSpy.calledWith(firstPageRelName)).to.be.true;
        });
    });

    describe('hasPreviousPage()', () => {
        it('should return false if there is no pageResource', () => {
            comp.pageResource = null;
            fixture.detectChanges();

            expect(comp.hasPreviousPage()).to.be.not.ok;
        });

        it('should return false if there is a pageResource but it does not have a prev relation', () => {
            stub(dummyPageResource, 'hasPreviousPageRel').returns(false);
            fixture.detectChanges();

            expect(comp.hasPreviousPage()).to.be.not.ok;
        });

        it('should return true if there is a pageResource with a prev relation', () => {
            stub(dummyPageResource, 'hasPreviousPageRel').returns(true);
            fixture.detectChanges();

            expect(comp.hasPreviousPage()).to.be.ok;
        });
    });

    describe('goPreviousPage()', () => {
        it(`should emit 'prev'`, () => {
            const previousPageRelName = 'prev';
            let onNavigateEmitSpy = spy(comp.onNavigate, 'emit');
            stub(dummyPageResource, 'getPreviousPageRelName').returns(previousPageRelName);
            fixture.detectChanges();
            comp.goPreviousPage();

            expect(onNavigateEmitSpy.calledWith(previousPageRelName)).to.be.true;
        });
    });

    describe('hasNextPage()', () => {
        it('should return false if there is no pageResource', () => {
            comp.pageResource = null;
            fixture.detectChanges();

            expect(comp.hasNextPage()).to.be.not.ok;
        });

        it('should return false if there is a pageResource but it does not have a next relation', () => {
            stub(dummyPageResource, 'hasNextPageRel').returns(false);
            fixture.detectChanges();

            expect(comp.hasNextPage()).to.be.not.ok;
        });

        it('should return true if there is a pageResource with a next relation', () => {
            stub(dummyPageResource, 'hasNextPageRel').returns(true);
            fixture.detectChanges();

            expect(comp.hasNextPage()).to.be.ok;
        });
    });

    describe('goNextPage()', () => {
        it(`should emit 'next'`, () => {
            const nextPageRelName = 'next';
            let onNavigateEmitSpy = spy(comp.onNavigate, 'emit');
            stub(dummyPageResource, 'getNextPageRelName').returns(nextPageRelName);
            fixture.detectChanges();
            comp.goNextPage();

            expect(onNavigateEmitSpy.calledWith(nextPageRelName)).to.be.true;
        });
    });

    describe('hasLastPage()', () => {
        it('should return false if there is no pageResource', () => {
            comp.pageResource = null;
            fixture.detectChanges();

            expect(comp.hasLastPage()).to.be.not.ok;
        });

        it('should return false if there is a pageResource but it does not have a last relation', () => {
            stub(dummyPageResource, 'hasLastPageRel').returns(false);
            fixture.detectChanges();

            expect(comp.hasLastPage()).to.be.not.ok;
        });

        it('should return true if there is a pageResource with a last relation', () => {
            stub(dummyPageResource, 'hasLastPageRel').returns(true);
            fixture.detectChanges();

            expect(comp.hasLastPage()).to.be.ok;
        });
    });

    describe('goLastPage()', () => {
        it(`should emit 'last'`, () => {
            const lastPageRelName = 'last';
            let onNavigateEmitSpy = spy(comp.onNavigate, 'emit');
            stub(dummyPageResource, 'getLastPageRelName').returns(lastPageRelName);
            fixture.detectChanges();
            comp.goLastPage();

            expect(onNavigateEmitSpy.calledWith(lastPageRelName)).to.be.true;
        });
    });
});
