import { expect } from 'chai';
import { spy } from 'sinon';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('should log a message on ngOnInit()', () => {
        const consoleSpy = spy(console, 'log');
        comp.ngOnInit();
        expect(consoleSpy.calledWith('On AppComponent init...')).to.be.true;
    });

    it('should display the header', () => {
        expect(el.textContent).to.equal('Hello World');
    });
});
