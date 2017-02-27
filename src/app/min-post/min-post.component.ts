import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostModel } from '../../models/post-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as Collections from 'typescript-collections';

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
  postsStack: Collections.Stack <any>;
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
    this.postsStack = new Collections.Stack();
  }

  ngOnInit()
  {
    if(this.uid !== null && this.college !== null)
    {
      this.getPost('Social');
    }
    else if (this.appComponent.authStatus !== null)
    {
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
    let maxElements = 3;
    this.itemSubscription = this.af.database.object(`/post-references/${this.college}/${category}`, { preserveSnapshot: true })
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.item = this.af.database.object(`/posts/${snapshot.key}`);
        this.innerItemSubscription = this.item.subscribe(postItems => {
          let post = new PostModel( postItems['title'],
                                        postItems['description'],
                                        postItems['reward'],
                                        postItems['category'],
                                        postItems['subCategory'] );
          this.postsStack.push(post);
          this.innerItemSubscription.unsubscribe();
          if(this.postsStack.size() >= maxElements)
          {
            this.popStackToArray(this.postsStack);
          }
        },
        error => {
          console.log('Something went wrong. Unsubscribing.');
          return;
        });
     });
     this.itemSubscription.unsubscribe();
    });
  }

  popStackToArray(stack: Collections.Stack <any>)
  {
    let size = stack.size();
    for(let i = 0 ; i < size; i++)
    {
      this.posts[i] = stack.pop();
    }
  }

  ngOnDestroy()
  {
    // Not really sure if the if's are necessary, but it doesn't hurt either
    if(this.itemSubscription !== null) { this.itemSubscription.unsubscribe(); }
    if(this.innerItemSubscription !== null) { this.innerItemSubscription.unsubscribe(); }

    // this meant the user reloaded the page and app.component hadn't finsihed getting its info
    if(this.authSubscription !== null)
    {
      this.authSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }
  }
}