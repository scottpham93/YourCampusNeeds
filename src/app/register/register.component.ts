import { Component } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent
{
    model: LoginRegisterModel;
    registerToastErrorHidden: boolean;
    registerToastVerifyMessageHidden: boolean;

    constructor(private af: AngularFire, private router: Router)
    {
        this.model = new LoginRegisterModel('', '', '');
        this.registerToastErrorHidden = true;
        this.registerToastVerifyMessageHidden = true;
    }

    register()
    {
        if (this.model.password === this.model.confirmPassword && this.model.password !== '')
        {
            // this is where we'll check the email to make sure it's .edu

            // create the user (this also logs them in so we log them out below)
            this.af.auth.createUser({
                email: this.model.email,
                password: this.model.password
            })
            .then(() => {
                this.af.auth.subscribe(auth => {
                    auth.auth.sendEmailVerification();
                    this.af.auth.logout();
                }).unsubscribe();
            })
            .then(() => {
                this.registerToastVerifyMessageHidden = false;
                this.registerToastErrorHidden = true;
                this.model.email = '';
                this.model.password = '';
                this.model.confirmPassword = '';
            })
            .catch(error => {
                console.log(error);
                this.registerToastErrorHidden = false;
                return;
            });
        }
        else
        {
            this.registerToastErrorHidden = false;
        }
    }
}
