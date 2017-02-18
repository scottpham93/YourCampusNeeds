import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewPostModel } from '../../models/new-post';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy
{
  newPost: NewPostModel;
  usersCollege: string;
  toastCreatePostErrorMessageHidden: boolean;
  toastCreatePostSuccessMessageHidden: boolean;
  toastInvalidPostMessageHidden: boolean;
  item: FirebaseObjectObservable<any>;
  authSubscription;
  itemSubscription;

  constructor(private af: AngularFire, private router: Router)
  {
    this.newPost = new NewPostModel('', '', 0, '', '');
    this.usersCollege = '';
    this.toastCreatePostErrorMessageHidden = true;
    this.toastCreatePostSuccessMessageHidden = true;
    this.toastInvalidPostMessageHidden = true;
  }

  ngOnInit()
  {
    this.authSubscription = this.af.auth.subscribe(auth => {
        this.item = this.af.database.object('/users/' + auth.auth.uid);
        this.itemSubscription = this.item.subscribe(snapshot => {
          this.usersCollege = snapshot['college'];
        });
    });
  }

  post()
  {
    if(!this.postIsValid())
    {
      this.toastInvalidPostMessageHidden = false;
      this.toastCreatePostSuccessMessageHidden = true;
      this.toastCreatePostErrorMessageHidden = true;
      return;
    }
    this.postToUsersCollegeNode();
  }

  postToUsersCollegeNode()
  {
      let dict = {
                  'title': this.newPost.title,
                  'description': this.newPost.description,
                  'reward': this.newPost.reward,
                  'category': this.newPost.category,
                  'subCategory': this.newPost.category };
                  console.log(this.usersCollege);
      this.af.database.list(`/posts/${this.usersCollege}/${this.newPost.category}/${this.newPost.subCategory}`).push(dict)
      .then(() => {
        this.toastCreatePostErrorMessageHidden = true;
        this.toastInvalidPostMessageHidden = true;
        this.toastCreatePostSuccessMessageHidden = false;
      })
      .catch(() => {
        this.toastCreatePostErrorMessageHidden = false;
        this.toastInvalidPostMessageHidden = true;
        this.toastCreatePostSuccessMessageHidden = true;
      });
  }

  ngOnDestroy()
  {
    this.authSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }

  postIsValid(): boolean
  {
    // tslint:disable-next-line:max-line-length
    return (this.newPost.title !== '' && this.newPost.description !== '' && this.newPost.reward >= 0 && this.newPost.category !== '') ? true : false;
  }
}
