import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
import { CurrentUserModel } from '../models/current-user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck, OnDestroy
{
  public isCollapsed: boolean;
  public loginLogoutLink;
  public authStatus: FirebaseAuthState;
  public currentUser: CurrentUserModel;
  userSubscription;

  constructor(private af: AngularFire, private router: Router)
  {
    this.isCollapsed = true;
    this.currentUser = new CurrentUserModel('', '');
  }

  ngOnInit()
  {
    this.af.auth.subscribe(auth => {
      this.authStatus = auth;
      if (auth == null) { this.loginLogoutLink = 'Login'; }
      else
      {
        this.loginLogoutLink = 'Logout';
        // get the current users data here
        this.currentUser.uid = auth.auth.uid;
        this.userSubscription = this.af.database.object(`/users/${auth.auth.uid}`).subscribe(snapshot => {
          this.currentUser.college = snapshot['college'];
        });
      }


    });
    console.log('OnInit called, subscribing to Authentication');
  }

  ngDoCheck()
  {
    if(this.authStatus == null)
    {
      this.loginLogoutLink = 'Login';
    }
    else
    {
      this.loginLogoutLink = 'Logout';
    }
  }

  handleLoginLogoutLink()
  {
    this.isCollapsed = true;
    if(this.loginLogoutLink === 'Login')
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.userSubscription.unsubscribe();
      this.af.auth.logout();
      this.router.navigate(['/']);
    }
  }

  homeRedirect()
  {
    this.isCollapsed = true;
    this.router.navigate(['/']);
  }

  registerRedirect()
  {
    this.isCollapsed = true;
    this.router.navigate(['/register']);
  }

  squareRedirect()
  {
    this.isCollapsed = true;
    this.router.navigate(['/square']);
  }

  ngOnDestroy()
  {
    this.af.auth.unsubscribe();
    console.log('OnDestroy called, unsubsribing');
  }
}
