import { Component, OnInit } from '@angular/core';

import { MenuItem } from './menu-item';

@Component({
    selector: 'na-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    menuItems: MenuItem[];

    ngOnInit() {
        this.menuItems = [
            new MenuItem('All Books', ['/books']),
            new MenuItem('Create Book', ['/books', 'new'])
        ];
    }
}
