import { Component, OnInit } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  loginToastErrorHidden: boolean;
  loginToastVerifiedMessageHidden: boolean;
  model: LoginRegisterModel;
  constructor(private af: AngularFire, private router: Router)
  {
    this.loginToastErrorHidden = true;
    this.loginToastVerifiedMessageHidden = true;
    this.model = new LoginRegisterModel('', '', '');
  }

  login()
  {
    this.af.auth.login( {email: this.model.email, password: this.model.password} )
    .then(auth => {
        if(auth.auth.emailVerified)
        {
          console.log('This email has been verified');
          this.redirectAfterLogin();
        }
        else
        {
          console.log('This email has not been verified');
          this.loginToastVerifiedMessageHidden = false;
          this.loginToastErrorHidden = true;
          this.af.auth.logout();
        }
    })
    .catch(error => {
      this.loginToastErrorHidden = false;
      this.loginToastVerifiedMessageHidden = true;
      console.log(error);
    });
  }

  redirectAfterLogin()
  {
    this.router.navigate(['/']);
  }
}
