import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostModel } from '../../models/post-model';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-min-post',
  templateUrl: './min-post.component.html',
  styleUrls: ['./min-post.component.css']
})

export class MinPostComponent implements OnInit, OnDestroy
{

  uid: string;
  college: string;
  posts = [];
  item: FirebaseObjectObservable <any>;
  usersCollege: string;
  reloadedPage: boolean;
  authSubscription;
  userSubscription;
  itemSubscription;
  innerItemSubscription;

  constructor(private af: AngularFire, private appComponent: AppComponent, private router: Router)
  {
    this.uid = this.appComponent.currentUser.uid;
    this.college = this.appComponent.currentUser.college;
  }

  ngOnInit()
  {
    if(this.uid !== null && this.college !== null)
    {
      console.log('Uid was not null');
      this.getPost('Social');
      this.reloadedPage = false;
    }
    else
    {
      console.log('Uid was null');
      this.reloadedPage = true;
      this.authSubscription = this.af.auth.subscribe(auth => {
        this.uid = auth.auth.uid;
        this.userSubscription = this.af.database.object(`/users/${this.uid}`).subscribe(snapshot => {
          this.college = snapshot['college'];
          this.getPost('Social');
        });
      });
    }
  }

  getPost(category: string)
  {
    console.log(this.college + ' *** ' + this.uid);
    this.itemSubscription = this.af.database.list(`/post-references/${this.college}/${category}`, { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.innerItemSubscription = this.af.database.object(`/posts/${snapshot.key}`).subscribe(postItems => {
          let post = new PostModel( postItems['title'],
                                        postItems['description'],
                                        postItems['reward'],
                                        postItems['category'],
                                        postItems['subCategory'] );
          this.posts.push(post);
        });
     });
    });
  }

  ngOnDestroy()
  {
    console.log('MinDestroyedCalled');
    if(this.authSubscription !== undefined)
    { 
      console.log('Unsubscribed because uid was null');
      this.authSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }
    console.log('unsubscribing from db');
    this.itemSubscription.unsubscribe();
    this.innerItemSubscription.unsubscribe();
  }
}
