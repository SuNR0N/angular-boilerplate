import { Component } from '@angular/core';

import { ModalService } from './modal.service';
import { IModalOptions } from './modal-options.model';

const modalId = 'confirmation-modal';

@Component({
    selector: 'na-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})
export class ModalComponent {
    title: string;
    message: string;
    cancelButtonText: string;
    cancelButtonStyle: string;
    okButtonText: string;
    okButtonStyle: string;
    onCancel: (event: Event) => void;
    onOK: (event: Event) => void;

    private defaults: IModalOptions = {
        title: 'Confirmation',
        message: 'Are you sure you want to cancel your changes?',
        cancelButtonText: 'Cancel',
        cancelButtonStyle: 'btn-secondary',
        okButtonText: 'OK',
        okButtonStyle: 'btn-primary'
    };

    constructor(modalService: ModalService) {
        modalService.activate = this.activate.bind(this);
    }

    activate({
        title = this.defaults.title,
        message = this.defaults.message,
        cancelButtonText = this.defaults.cancelButtonText,
        cancelButtonStyle = this.defaults.cancelButtonStyle,
        okButtonText = this.defaults.okButtonText,
        okButtonStyle = this.defaults.okButtonStyle
    }: IModalOptions = {}) {
        this.title = title;
        this.message = message;
        this.cancelButtonText = cancelButtonText;
        this.cancelButtonStyle = cancelButtonStyle;
        this.okButtonText = okButtonText;
        this.okButtonStyle = okButtonStyle;

        let promise = new Promise<boolean>((resolve, reject) => {
            this.onCancel = (event: Event) => resolve(false);
            this.onOK = (event: Event) => resolve(true);
            this.show();
        });

        return promise;
    }

    cancel(event: Event) {
        event.preventDefault();
        if (!this.onCancel(event)) {
            this.hide();
        }
    }

    ok(event: Event) {
        event.preventDefault();
        if (!this.onOK(event)) {
            this.hide();
        }
    }

    private show() {
        $(`#${modalId}`).modal('show');
    }

    private hide() {
        $(`#${modalId}`).modal('hide');
    }
}
