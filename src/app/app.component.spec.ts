import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SquareComponent } from './square/square.component';
import { PostComponent } from './post/post.component';

describe('Component: AppComponent', () => {
    let component: AppComponent;
    beforeEach(() => {

      const appRoutes: Routes = [
        { path: 'square', component: SquareComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent }
      ];

      const firebaseConfig = {
        apiKey: 'AIzaSyAtB2Ky1pQEHdC5k8L1oSERmcCrgC2DRjM',
        authDomain: 'yourcampusneeds-3f6f3.firebaseapp.com',
        databaseURL: 'https://yourcampusneeds-3f6f3.firebaseio.com',
        storageBucket: 'yourcampusneeds-3f6f3.appspot.com',
        messagingSenderId: '183814315744'
      };

      const myFirebaseAuthConfig = {
        provider: AuthProviders.Google,
        method: AuthMethods.Password
      };


        TestBed.configureTestingModule({
              declarations: [
                AppComponent,
                CollapseDirective,
                RegisterComponent,
                LoginComponent,
                SquareComponent,
                PostComponent
              ],
              imports: [
                AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
                BrowserModule,
                FormsModule,
                HttpModule,
                RouterModule.forRoot(appRoutes, { useHash: true })
              ],
        });
        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('it should be defined', () => {
        expect(component).toBeDefined();
    });
});
