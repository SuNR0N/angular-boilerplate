import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { IHATEOASPageResource } from '../../core/hateoas/hateoas-page-resource.model';

@Component({
    selector: 'na-pager',
    templateUrl: 'pager.component.html',
    styleUrls: ['pager.component.css']
})
export class PagerComponent {
    @Input() id: string;
    @Input() pageResource: IHATEOASPageResource<any>;
    @Input() firstButtonText: string = 'First';
    @Input() previousButtonText: string = 'Previous';
    @Input() nextButtonText: string = 'Next';
    @Input() lastButtonText: string = 'Last';
    @Input() showProgress: boolean = true;
    @Input() showCurrentPage: boolean = true;
    @Input() showTotalPages: boolean = true;
    @Input() showBoundaryLinks: boolean = true;
    @Output() onNavigate: EventEmitter<string>;

    constructor() {
        this.onNavigate = new EventEmitter<string>();
    }

    hasAnyPages() {
        return this.pageResource && this.pageResource.hasAnyPagingRels();
    }

    hasFirstPage() {
        return this.pageResource && this.pageResource.hasFirstPageRel();
    }

    goFirstPage(event: Event) {
        this.onNavigate.emit(this.pageResource.getFirstPageRelName());
    }

    hasPreviousPage() {
        return this.pageResource && this.pageResource.hasPreviousPageRel();
    }

    goPreviousPage(event: Event) {
        this.onNavigate.emit(this.pageResource.getPreviousPageRelName());
    }

    hasNextPage() {
        return this.pageResource && this.pageResource.hasNextPageRel();
    }

    goNextPage(event: Event) {
        this.onNavigate.emit(this.pageResource.getNextPageRelName());
    }

    hasLastPage() {
        return this.pageResource && this.pageResource.hasLastPageRel();
    }

    goLastPage(event: Event) {
        this.onNavigate.emit(this.pageResource.getLastPageRelName());
    }
}
