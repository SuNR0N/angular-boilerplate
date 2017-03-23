import { expect } from 'chai';
import { spy, stub, SinonStub } from 'sinon';

import { Router } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../auth/auth.service';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authServiceStub = <AuthService> {
        isLoggedInValue: () => true
    };
    let routerStub = <Router> {
        navigate: (commands: any[]) => null
    };

    beforeEach(() => {
        guard = new AuthGuard(authServiceStub, routerStub);
    });

    describe('canActivate()', () => {
        let isLoggedInValueStub: SinonStub;

        beforeEach(() => {
            isLoggedInValueStub = stub(authServiceStub, 'isLoggedInValue');
        });

        afterEach(() => {
            isLoggedInValueStub.restore();
        });

        it('should return true if the current user is logged in', () => {
            isLoggedInValueStub.returns(true);

            expect(guard.canActivate()).to.be.true;
        });

        it('should navigate to the 403 page and return false if there is no logged in user', () => {
            let routerNavigateSpy = spy(routerStub, 'navigate');
            isLoggedInValueStub.returns(false);

            expect(guard.canActivate()).to.be.false;
            expect(routerNavigateSpy.calledWith(['/403'])).to.be.true;
        });
    });
});
