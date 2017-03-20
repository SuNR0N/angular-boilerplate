import * as toastr from 'toastr';

export class ToasterService {
    error(message: string, title?: string) {
        toastr.error(message, title);
    }
    info(message: string, title?: string) {
        toastr.info(message, title);
    }
    success(message: string, title?: string) {
        toastr.success(message, title);
    }
    warning(message: string, title?: string) {
        toastr.warning(message, title);
    }
}
