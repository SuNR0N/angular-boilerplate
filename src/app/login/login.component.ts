import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from '../core/logger.service';
import { AuthService } from '../core/auth/auth.service';
import { ICredential } from './credential.model';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    username: FormControl;
    password: FormControl;
    loginForm: FormGroup;

    constructor(
        private loggerService: LoggerService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        this.createForm();
    }

    login() {
        let credential: ICredential = {
            username: this.username.value,
            password: this.password.value
        };
        this.authService.login(credential).subscribe(
            (user) => {
                this.router.navigate(['/books']);
            },
            (error) => {
                this.loggerService.log(`Failed to login`);
                this.loggerService.log(error);
            }
        );
    }

    isFormInvalid() {
        return this.loginForm.invalid;
    }

    private createForm() {
        this.username = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
        this.loginForm = new FormGroup({
            username: this.username,
            password: this.password
        });
    }
}
