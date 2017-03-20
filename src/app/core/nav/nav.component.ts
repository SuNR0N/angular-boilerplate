import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { IMenuItem } from './menu-item.model';

@Component({
    selector: 'na-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    leftMenuItems: IMenuItem[];
    rightMenuItems: IMenuItem[];

    private _leftMenuItems: IMenuItem[];
    private _rightMenuItems: IMenuItem[];

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.leftMenuItems = this._leftMenuItems = [
            {
                caption: 'All Books',
                link: ['/books'],
                class: 'fa-book',
                isDisabled: () => false
            },
            {
                caption: 'Create Book',
                link: ['/books', 'new'],
                class: 'fa-plus',
                isDisabled: () => !this.authService.isLoggedInValue()
            }
        ];
        this._rightMenuItems = [
            {
                caption: 'Login',
                link: ['/login'],
                class: 'fa-sign-in',
                isVisible: () => !this.authService.isLoggedInValue()
            },
            {
                caption: 'Logout',
                link: null,
                class: 'fa-sign-out',
                isVisible: () => this.authService.isLoggedInValue(),
                onClick: () => this.authService.logout()
            }
        ];
        this.authService.isLoggedIn().subscribe(this.onLoginStatusChange);
    }

    private onLoginStatusChange = (currentUser: any): void => {
        this.rightMenuItems = this._rightMenuItems.filter((menuItem) => menuItem.isVisible());
    }
}
