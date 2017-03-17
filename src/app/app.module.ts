import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthModule } from './core/auth/auth.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AuthModule,
        LoginModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
