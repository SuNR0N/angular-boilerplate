import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'na-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
    @Input() placeholder: string = 'Search...';
    @Input() delay: number = 400;
    @Output() onChange: EventEmitter<string>;

    searchInput: FormControl;

    constructor() {
        this.searchInput = new FormControl();
        this.onChange = new EventEmitter<string>();
    }

    ngOnInit() {
        this.searchInput.valueChanges
            .debounceTime(this.delay)
            .distinctUntilChanged()
            .subscribe((filterText) => this.onChange.emit(filterText));
    }
}
