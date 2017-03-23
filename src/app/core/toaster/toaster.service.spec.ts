import { expect } from 'chai';
import { spy, SinonSpy } from 'sinon';
import * as toastr from 'toastr';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
    const testMessage = 'Test Message';
    const testTitle = 'Test Title';
    let service: ToasterService;

    beforeEach(() => {
        service = new ToasterService();
    });

    describe('error(message, title?)', () => {
        let errorSpy: SinonSpy;

        beforeEach(() => {
            errorSpy = spy(toastr, 'error');
        });

        afterEach(() => {
            errorSpy.restore();
        });

        it('should call toastr.error function with the message only if only the message was passed in', () => {
            service.error(testMessage);

            expect(errorSpy.calledWithExactly(testMessage, undefined)).to.be.true;
        });

        it('should call toastr.error function with the message and title if both arguments were passed in', () => {
            service.error(testMessage, testTitle);

            expect(errorSpy.calledWithExactly(testMessage, testTitle)).to.be.true;
        });
    });

    describe('info(message, title?)', () => {
        let infoSpy: SinonSpy;

        beforeEach(() => {
            infoSpy = spy(toastr, 'info');
        });

        afterEach(() => {
            infoSpy.restore();
        });

        it('should call toastr.info function with the message only if only the message was passed in', () => {
            service.info(testMessage);

            expect(infoSpy.calledWithExactly(testMessage, undefined)).to.be.true;
        });

        it('should call toastr.info function with the message and title if both arguments were passed in', () => {
            service.info(testMessage, testTitle);

            expect(infoSpy.calledWithExactly(testMessage, testTitle)).to.be.true;
        });
    });

    describe('success(message, title?)', () => {
        let successSpy: SinonSpy;

        beforeEach(() => {
            successSpy = spy(toastr, 'success');
        });

        afterEach(() => {
            successSpy.restore();
        });

        it('should call toastr.success function with the message only if only the message was passed in', () => {
            service.success(testMessage);

            expect(successSpy.calledWithExactly(testMessage, undefined)).to.be.true;
        });

        it('should call toastr.success function with the message and title if both arguments were passed in', () => {
            service.success(testMessage, testTitle);

            expect(successSpy.calledWithExactly(testMessage, testTitle)).to.be.true;
        });
    });

    describe('warning(message, title?)', () => {
        let warningSpy: SinonSpy;

        beforeEach(() => {
            warningSpy = spy(toastr, 'warning');
        });

        afterEach(() => {
            warningSpy.restore();
        });

        it('should call toastr.warning function with the message only if only the message was passed in', () => {
            service.warning(testMessage);

            expect(warningSpy.calledWithExactly(testMessage, undefined)).to.be.true;
        });

        it('should call toastr.warning function with the message and title if both arguments were passed in', () => {
            service.warning(testMessage, testTitle);

            expect(warningSpy.calledWithExactly(testMessage, testTitle)).to.be.true;
        });
    });
});
