import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  public isCollapsed: boolean;
  public loginLogoutLink;
  public authStatus: FirebaseAuthState;

  constructor(private af: AngularFire, private router: Router)
  {
    this.isCollapsed = true;
  }

  ngOnInit() {
  }

  login()
  {
    this.isCollapsed = true;
    this.router.navigate(['/login']);
  }

  register()
  {
    this.isCollapsed = true;
    this.router.navigate(['/register']);
  }

}
