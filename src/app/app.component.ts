import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  public isCollapsed: boolean;
  public loginLogoutLink = 'Login';

  constructor(private af: AngularFire, private router: Router)
  {
    this.isCollapsed = true;
  }

  handleLoginLogoutLink()
  {
    if(this.loginLogoutLink === 'Login')
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.loginLogoutLink = 'Login';
      this.af.auth.logout();
      this.router.navigate(['/']);
    }
  }
}
