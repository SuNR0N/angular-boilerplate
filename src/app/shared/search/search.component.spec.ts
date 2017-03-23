import { expect } from 'chai';
import { spy, SinonSpy } from 'sinon';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let fixture: ComponentFixture<SearchComponent>;
    let comp: SearchComponent;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent
            ],
            providers: [],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('#search-input'));
        el = de.nativeElement;
    });

    it('should construct the component properly', () => {
        expect(comp.searchInput).to.be.instanceof(FormControl);
        expect(comp.onChange).to.be.instanceOf(EventEmitter);
    });

    it(`should default the 'placeholder' property when not provided`, () => {
        fixture.detectChanges();
        expect(el.getAttribute('placeholder')).to.be.equal('Search...');
    });

    it(`should set the 'placeholder' property when provided`, () => {
        comp.placeholder = 'Placeholder';
        fixture.detectChanges();
        expect(el.getAttribute('placeholder')).to.be.equal('Placeholder');
    });

    describe('ngOnInit()', () => {
        const defaultDelay: number = 400;
        const testInputValue: string = 'test';
        let debounceTimeSpy: SinonSpy;
        let onChangeEmitSpy: SinonSpy;

        beforeEach(() => {
            debounceTimeSpy = spy(comp.searchInput.valueChanges, 'debounceTime');
            onChangeEmitSpy = spy(comp.onChange, 'emit');
        });

        it(`should default the 'delay' property when not provided`, () => {
            comp.ngOnInit();

            expect(debounceTimeSpy.calledWith(defaultDelay)).to.be.true;
        });

        it(`should set the 'delay' property when provided`, () => {
            let customDelay = 500;
            comp.delay = customDelay;
            fixture.detectChanges();

            expect(debounceTimeSpy.calledWith(customDelay)).to.be.true;
        });

        it('should not emit a change within the given delay if the value is changed', fakeAsync(() => {
            fixture.detectChanges();

            comp.searchInput.setValue(testInputValue);
            tick(200);

            expect(onChangeEmitSpy.called).to.be.false;

            discardPeriodicTasks();
        }));

        it('should emit a change after the given delay if the value is changed', fakeAsync(() => {
            fixture.detectChanges();

            comp.searchInput.setValue(testInputValue);
            tick(defaultDelay);

            expect(onChangeEmitSpy.calledWith(testInputValue)).to.be.true;

            discardPeriodicTasks();
        }));

        it('should not emit a change after the given delay if the value is unchanged', fakeAsync(() => {
            fixture.detectChanges();

            comp.searchInput.setValue(testInputValue);
            tick(200);
            comp.searchInput.setValue('');
            tick(200);

            expect(onChangeEmitSpy.called).to.be.false;

            discardPeriodicTasks();
        }));
    });
});
