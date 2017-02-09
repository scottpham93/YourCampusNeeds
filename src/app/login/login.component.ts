import { Component, OnInit } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginToastError: boolean;
  model: LoginRegisterModel;
  constructor()
  { 
    this.loginToastError = true;
    this.model = new LoginRegisterModel('', '', '');
  }

  ngOnInit() { }

  login()
  {
    this.loginToastError = false;
  }
}
