import { Component } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent
{
    model: LoginRegisterModel;
    registerToastErrorHidden: boolean;
    emailToastMessageHidden: boolean;
    constructor(private af: AngularFire)
    {
        this.model = new LoginRegisterModel('', '', '');
        this.registerToastErrorHidden = true;
        this.emailToastMessageHidden = true;
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
                    console.log('Verification Email Sent');
                });
            })
            .then(() => {
                this.af.auth.unsubscribe(); // we need to make sure we unsubscribe the listener before logging out
                this.af.auth.logout();
                this.emailToastMessageHidden = false;
                this.registerToastErrorHidden = true;
                console.log('User has been logged out');
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
