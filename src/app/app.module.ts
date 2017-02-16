import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SquareComponent } from './square/square.component';
import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'square', component: SquareComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const firebaseConfig = {
    apiKey: 'AIzaSyAtB2Ky1pQEHdC5k8L1oSERmcCrgC2DRjM',
    authDomain: 'yourcampusneeds-3f6f3.firebaseapp.com',
    databaseURL: 'https://yourcampusneeds-3f6f3.firebaseio.com',
    storageBucket: 'yourcampusneeds-3f6f3.appspot.com',
    messagingSenderId: '183814315744'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    CollapseDirective,
    RegisterComponent,
    LoginComponent,
    SquareComponent,
    PostComponent,
    PageNotFoundComponent,
    HomeComponent,
    CreatePostComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

