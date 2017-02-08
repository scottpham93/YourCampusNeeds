import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  public isCollapsed = true;
}
