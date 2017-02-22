/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinPostComponent } from './min-post.component';

describe('MinPostComponent', () => {
  let component: MinPostComponent;
  let fixture: ComponentFixture<MinPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
