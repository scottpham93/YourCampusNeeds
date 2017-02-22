import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';
import { ModalModule, Modal } from 'ngx-modal';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit
{

  constructor(private ac: AppComponent, private router: Router) { }

  ngOnInit()
  {
    if(this.ac.authStatus === null && this.ac.authStatus !== undefined) { this.router.navigate(['/login']); }
  }
}
