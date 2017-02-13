import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent
{
  constructor(private ac: AppComponent, private router: Router)
  {
    if(this.ac.authStatus == null) { this.router.navigate(['/login']); }
  }
}
