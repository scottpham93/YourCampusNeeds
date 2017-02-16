import { Component } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
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
    registerToastEmailErrorMessageHidden: boolean;
    public emailDomain: string;

    constructor(private af: AngularFire, private router: Router)
    {
        this.model = new LoginRegisterModel('', '', '');
        this.registerToastErrorHidden = true;
        this.registerToastVerifyMessageHidden = true;
        this.registerToastEmailErrorMessageHidden = true;
        this.emailDomain = '';
    }

    register()
    {
        if (this.model.password === this.model.confirmPassword && this.model.password !== '')
        {
            // check for edu account and toast if it isn't
            if(!this.checkEmailEndingAndGetDomain(this.model.email))
            {
                this.registerToastEmailErrorMessageHidden = false;
                this.registerToastErrorHidden = true;
                return;
            }

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
                this.registerToastEmailErrorMessageHidden = true;
                this.model.email = '';
                this.model.password = '';
                this.model.confirmPassword = '';
            })
            .catch(error => {
                console.log(error);
                this.af.auth.unsubscribe();
                this.registerToastErrorHidden = false;
                this.registerToastEmailErrorMessageHidden = true;
                this.model.password = '';
                this.model.confirmPassword = '';
                return;
            });
        }
        else
        {
            this.registerToastEmailErrorMessageHidden = true;
            this.registerToastErrorHidden = false;
            this.model.password = '';
            this.model.confirmPassword = '';
        }
    }

    checkEmailEndingAndGetDomain(emailAddress: string): Boolean
    {
        let parsedEmail = emailAddress.match('(@)(.*)(.edu)$');
        if(parsedEmail != null)
        {
            this.emailDomain = parsedEmail[2];
            return true;
        }
        else
        {
            return false;
        }
    }
}
