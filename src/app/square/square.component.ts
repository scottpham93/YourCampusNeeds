import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';
import { ModalModule, Modal } from 'ngx-modal';



@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent
{

  constructor(private ac: AppComponent, private router: Router)
  {
    /* Hotfix: This solves the bug of the user being sent to the login page
       because authStatus is still undefined. However, I'm not sure
       if this will completely fix this issue or if we need to implement the
       lifecycle hook - AfterContentChecked that will check the authStatus */
    if(this.ac.authStatus === null && this.ac.authStatus !== undefined)
    {
      this.router.navigate(['/login']);
    }

  }

  submitPost()
  {
    location.reload();
  }
}
