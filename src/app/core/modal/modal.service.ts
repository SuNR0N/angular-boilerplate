import { IModalOptions } from './modal-options.model';

export class ModalService {
    activate: (options: IModalOptions) => Promise<boolean>;
}
