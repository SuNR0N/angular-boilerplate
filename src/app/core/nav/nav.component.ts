import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ResetService } from '../reset/reset.service';
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
        private authService: AuthService,
        private resetService: ResetService
    ) { }

    ngOnInit() {
        this.leftMenuItems = this._leftMenuItems = [
            {
                id: 'all-books-menu',
                caption: 'All Books',
                link: ['/books'],
                class: 'fa-book',
                isDisabled: () => false
            },
            {
                id: 'create-book-menu',
                caption: 'Create Book',
                link: ['/books', 'new'],
                class: 'fa-plus',
                isDisabled: () => !this.authService.isLoggedInValue()
            }
        ];
        this._rightMenuItems = [
            {
                id: 'login-menu',
                caption: 'Login',
                link: ['/login'],
                class: 'fa-sign-in',
                isVisible: () => !this.authService.isLoggedInValue()
            },
            {
                id: 'reset-data-menu',
                caption: 'Reset Data',
                link: null,
                class: 'fa-undo',
                isVisible: () => this.authService.isLoggedInValue(),
                onClick: (event: Event) => {
                    event.preventDefault();
                    this.resetService.reset();
                }
            },
            {
                id: 'logout-menu',
                caption: 'Logout',
                link: null,
                class: 'fa-sign-out',
                isVisible: () => this.authService.isLoggedInValue(),
                onClick: (event: Event) => {
                    event.preventDefault();
                    this.authService.logout();
                }
            }
        ];
        this.authService.isLoggedIn().subscribe(this.onLoginStatusChange);
    }

    private onLoginStatusChange = (currentUser: any): void => {
        this.rightMenuItems = this._rightMenuItems.filter((menuItem) => menuItem.isVisible());
    }
}
