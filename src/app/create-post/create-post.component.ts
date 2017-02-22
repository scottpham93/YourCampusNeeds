import { Component, OnDestroy } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnDestroy
{
  newPost: PostModel;
  college: string;
  uid: string;
  toastCreatePostErrorMessageHidden: boolean;
  toastCreatePostSuccessMessageHidden: boolean;
  toastInvalidPostMessageHidden: boolean;
  item: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, private router: Router, private appComponent: AppComponent)
  {
    this.newPost = new PostModel('', '', 0, '', '');
    this.college = this.appComponent.currentUser.college;
    this.uid = this.appComponent.currentUser.uid;
    this.toastCreatePostErrorMessageHidden = true;
    this.toastCreatePostSuccessMessageHidden = true;
    this.toastInvalidPostMessageHidden = true;
  }

  post()
  {
    if(!this.postIsValid())
    {
      this.toastPostInvalid();
      return;
    }
    this.sendPostToFirebase();
  }

  sendPostToFirebase()
  {
      let dict = {
                  'title': this.newPost.title,
                  'description': this.newPost.description,
                  'reward': this.newPost.reward,
                  'category': this.newPost.category,
                  'subCategory': this.newPost.category };
      let postReference = this.af.database.list('/posts').push(dict).key;
      let referenceDict = { };
      referenceDict[postReference] = 1;
      this.af.database.object(`/user-posts/${this.uid}`).update(referenceDict);
      this.af.database.object(`/post-references/${this.college}/${this.newPost.category}`).update(referenceDict)
      .then(() => {
        this.toastSuccessMessage();
      })
      .catch(() => {
        this.toastErrorMessage();
      });
  }

  toastPostInvalid()
  {
    this.toastInvalidPostMessageHidden = false;
    this.toastCreatePostSuccessMessageHidden = true;
    this.toastCreatePostErrorMessageHidden = true;
  }

  toastSuccessMessage()
  {
    this.toastCreatePostErrorMessageHidden = true;
    this.toastInvalidPostMessageHidden = true;
    this.toastCreatePostSuccessMessageHidden = false;
  }

  toastErrorMessage()
  {
    this.toastCreatePostErrorMessageHidden = false;
    this.toastInvalidPostMessageHidden = true;
    this.toastCreatePostSuccessMessageHidden = true;
  }

  postIsValid(): boolean
  {
    // tslint:disable-next-line:max-line-length
    return (this.newPost.title !== '' && this.newPost.description !== '' && this.newPost.reward >= 0 && this.newPost.category !== '') ? true : false;
  }

  ngOnDestroy()
  {
    
  }
}
