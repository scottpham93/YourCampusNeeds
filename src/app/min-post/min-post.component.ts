import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostModel } from '../../models/post-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
  authSubscription: Subscription;
  userSubscription: Subscription;
  itemSubscription: Subscription;
  innerItemSubscription: Subscription;

  constructor(private af: AngularFire, private appComponent: AppComponent, private router: Router)
  {
    this.uid = this.appComponent.currentUser.uid;
    this.college = this.appComponent.currentUser.college;
    this.authSubscription = null;
    this.userSubscription = null;
    this.itemSubscription = null;
    this.innerItemSubscription = null;
    console.log('Min-Post Loaded');
    console.log(this.uid);
    console.log(this.college);
  }

  ngOnInit()
  {
    console.log('Min-Post OnInit called');
    if(this.uid !== null && this.college !== null)
    {
      console.log('Uid was not null');
      this.getPost('Social');
    }
    else if (this.appComponent.authStatus !== null)
    {
      console.log('Uid was null');
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
          console.log('from inside innerItem' + snapshot.key);
        });
     });
     console.log('from inside itemSub');
    });
  }

  ngOnDestroy()
  {
    console.log('Unsubscribing from DB');

    if(this.itemSubscription !== null) { this.itemSubscription.unsubscribe(); }
    if(this.innerItemSubscription !== null) { this.innerItemSubscription.unsubscribe();}

    // this meant the user reloaded the page and app.component hadn't finsihed getting its info
    if(this.authSubscription !== null)
    {
      console.log('Unsubscribed because uid was null');
      this.authSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }
  }
}
