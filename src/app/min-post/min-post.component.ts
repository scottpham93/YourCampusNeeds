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
  posts = [];
  item: FirebaseObjectObservable <any>;
  usersCollege: string;
  itemSubscription;
  public innerItemSubscription;

  constructor(private af: AngularFire, private appComponent: AppComponent)
  {
    this.uid = this.appComponent.currentUser.uid;
    this.college = this.appComponent.currentUser.college;
    this.getPost('Social');
  }

  getPost(category: string)
  {
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
    this.itemSubscription.unsubscribe();
    if(this.innerItemSubscription !== undefined ) { this.innerItemSubscription.unsubscribe(); }
  }

}
