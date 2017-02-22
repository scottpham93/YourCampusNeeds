import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostModel } from '../../models/post-model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-min-post',
  templateUrl: './min-post.component.html',
  styleUrls: ['./min-post.component.css']
})

export class MinPostComponent implements OnDestroy
{

  uid: string;
  college: string;
  post: PostModel;
  item: FirebaseObjectObservable <any>;
  usersCollege: string;
  authSubscription;
  itemSubscription;
  postSubscription;

  constructor(private af: AngularFire, private appComponent: AppComponent)
  { 
    this.uid = this.appComponent.currentUser.uid;
    this.college = this.appComponent.currentUser.college;
    this.post = new PostModel('', '', 0, '', '');
  }

  ngOnDestroy()
  {

  }

}
