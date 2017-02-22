import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostModel } from '../../models/post-model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-min-post',
  templateUrl: './min-post.component.html',
  styleUrls: ['./min-post.component.css']
})

export class MinPostComponent implements OnInit, OnDestroy
{

  post: PostModel;
  item: FirebaseObjectObservable <any>;
  usersCollege: string;
  authSubscription;
  itemSubscription;
  postSubscription;

  constructor(private af: AngularFire, private authStatus: AppComponent)
  { 
    this.post = new PostModel('', '', 0, '', '');
  }

  ngOnInit()
  {

  }

  ngOnDestroy()
  {
    if(this.authStatus === null || this.authSubscription === undefined || this.postSubscription === undefined) { return; }
    this.authSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }

}
