import { expect } from 'chai';
import { spy, useFakeTimers, SinonSpy, SinonFakeTimers } from 'sinon';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    const now = new Date();
    const testMessage = 'Test';
    let service: LoggerService;
    let clock: SinonFakeTimers;

    before(() => {
        clock = useFakeTimers(now.getTime());
    });

    beforeEach(() => {
        service = new LoggerService();
    });

    after(() => {
        clock.restore();
    });

    describe('debug(message?)', () => {
        let consoleDebugSpy: SinonSpy;

        beforeEach(() => {
            consoleDebugSpy = spy(console, 'debug');
        });

        afterEach(() => {
            consoleDebugSpy.restore();
        });

        it('should call console.debug function with the current timestamp and the message argument', () => {
            service.debug(testMessage);

            expect(consoleDebugSpy.calledWith('[' + now.toUTCString() + ']', testMessage)).to.be.true;
        });
    });

    describe('error(message?)', () => {
        let consoleErrorSpy: SinonSpy;

        beforeEach(() => {
            consoleErrorSpy = spy(console, 'error');
        });

        afterEach(() => {
            consoleErrorSpy.restore();
        });

        it('should call console.error function with the current timestamp and the message argument', () => {
            service.error(testMessage);

            expect(consoleErrorSpy.calledWith('[' + now.toUTCString() + ']', testMessage)).to.be.true;
        });
    });

    describe('info(message?)', () => {
        let consoleInfoSpy: SinonSpy;

        beforeEach(() => {
            consoleInfoSpy = spy(console, 'info');
        });

        afterEach(() => {
            consoleInfoSpy.restore();
        });

        it('should call console.info function with the current timestamp and the message argument', () => {
            service.info(testMessage);

            expect(consoleInfoSpy.calledWith('[' + now.toUTCString() + ']', testMessage)).to.be.true;
        });
    });

    describe('log(message?)', () => {
        let consoleLogSpy: SinonSpy;

        beforeEach(() => {
            consoleLogSpy = spy(console, 'log');
        });

        afterEach(() => {
            consoleLogSpy.restore();
        });

        it('should call console.log function with the current timestamp and the message argument', () => {
            service.log(testMessage);

            expect(consoleLogSpy.calledWith('[' + now.toUTCString() + ']', testMessage)).to.be.true;
        });
    });

    describe('warn(message?)', () => {
        let consoleWarnSpy: SinonSpy;

        beforeEach(() => {
            consoleWarnSpy = spy(console, 'log');
        });

        afterEach(() => {
            consoleWarnSpy.restore();
        });

        it('should call console.warn function with the current timestamp and the message argument', () => {
            service.log(testMessage);

            expect(consoleWarnSpy.calledWith('[' + now.toUTCString() + ']', testMessage)).to.be.true;
        });
    });
});
