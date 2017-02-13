import { Component, DoCheck, OnDestroy } from '@angular/core';
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
    this.isActive = true;
  }
}
