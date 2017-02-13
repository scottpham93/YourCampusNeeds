import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent
{
  isActive: boolean;
  constructor(private af: AngularFire, private router: Router, private ac: AppComponent)
  {
    // if the user isn't logged in then redirect them to the login page
    this.af.auth.subscribe(auth => {
      if(auth == null) { this.router.navigate(['/login']); }
      else { this.ac.loginLogoutLink = 'Logout'; }
    }).unsubscribe();

    this.isActive = true;
  }
}
