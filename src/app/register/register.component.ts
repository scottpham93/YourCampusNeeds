import { Component } from '@angular/core';
import { LoginRegisterModel } from '../../models/login-register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent
{
    model: LoginRegisterModel;
    registerToastError = true;
    constructor()
    {
        this.model = new LoginRegisterModel('','','');
    }

    register()
    {
        this.registerToastError = false;
    }
}
