import { expect } from 'chai';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
    let fixture: ComponentFixture<PageNotFoundComponent>;
    let comp: PageNotFoundComponent;
    let icon: DebugElement;
    let header: DebugElement;
    let message: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageNotFoundComponent
            ],
            providers: [],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageNotFoundComponent);
        comp = fixture.componentInstance;

        icon = fixture.debugElement.query(By.css('i'));
        header = fixture.debugElement.query(By.css('h2'));
        message = fixture.debugElement.query(By.css('div'));
    });

    it('should display the proper icon', () => {
        let nativeIcon = <HTMLElement> icon.nativeElement;

        expect(nativeIcon.classList.contains('fa')).to.be.true;
        expect(nativeIcon.classList.contains('fa-meh-o')).to.be.true;
    });

    it('should display 404 as the header', () => {
        let nativeHeader = <HTMLElement> header.nativeElement;

        expect(nativeHeader.textContent).to.be.equal('404');
    });

    it('should display a meaningful error message', () => {
        let nativeMessage = <HTMLElement> message.nativeElement;

        expect(nativeMessage.textContent).to.be.equal('The page you requested does not exist');
    });
});
