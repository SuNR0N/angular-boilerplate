import { expect } from 'chai';
import { spy } from 'sinon';

import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Subject } from 'rxjs/Subject';

import { AuthHttp } from 'angular2-jwt';

import { ResetService } from './reset.service';
import { ToasterService } from '../toaster/toaster.service';

describe('ResetService', () => {
    let service: ResetService;
    let backend: MockBackend;
    let lastConnection: MockConnection;
    let injector: ReflectiveInjector;
    let toasterServiceStub = {
        success: () => null
    };

    beforeEach(() => {
        injector = ReflectiveInjector.resolveAndCreate([
            {
                provide: ConnectionBackend,
                useClass: MockBackend
            },
            {
                provide: RequestOptions,
                useClass: BaseRequestOptions
            },
            {
                provide: ToasterService,
                useValue: toasterServiceStub
            },
            {
                provide: AuthHttp,
                useClass: Http
            },
            ResetService
        ]);

        service = injector.get(ResetService);
        backend = injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
    });

    it('should construct it properly', () => {
        expect(service.resetCountSubject).to.be.instanceOf(Subject);
    });

    describe('reset()', () => {
        it('should call the correct URL', () => {
            service.reset();
            expect(lastConnection.request.url).to.match(/\/api\/books\/reset-action$/);
        });

        it('should call the URL without a body', () => {
            service.reset();
            expect(lastConnection.request.getBody()).to.be.null;
        });

        it('should increate the counter if the call succeeds', fakeAsync(() => {
            let resetCountSubjectNextSpy = spy(service.resetCountSubject, 'next');

            service.reset();
            lastConnection.mockRespond(new Response(new ResponseOptions({
                status: 200
            })));
            tick();

            expect(resetCountSubjectNextSpy.calledWith(1)).to.be.true;
        }));

        it('should display a message via toaster if the call succeeds', fakeAsync(() => {
            let toasterServiceSuccessSpy = spy(toasterServiceStub, 'success');

            service.reset();
            lastConnection.mockRespond(new Response(new ResponseOptions({
                status: 200
            })));
            tick();

            expect(toasterServiceSuccessSpy.calledWithExactly(
                'Database has been successfully reverted',
                'Successful Restoration'
            )).to.be.true;
        }));
    });
});
