import { Component } from '@angular/core';
import { RegisterModel } from '../../models/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent
{
    model: RegisterModel;
    loginToastError = true;
    constructor()
    {
        this.model = new RegisterModel('','','');
    }

    register()
    {
        this.loginToastError = false;
    }
}
