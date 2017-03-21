import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ICanDeactivate {
    canDeactivate: () => Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<ICanDeactivate> {
    canDeactivate(component: ICanDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? this.toObservable(component.canDeactivate()) : true;
    }

    private toObservable(value: Promise<boolean> | boolean): Observable<boolean> | boolean {
        let promise = Promise.resolve(value);
        let observable = Observable.fromPromise(promise);

        return observable;
    }
}
