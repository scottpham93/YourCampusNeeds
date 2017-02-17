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

  constructor(private af: AngularFire, private router: Router)
  {
    this.newPost = new NewPostModel('', '', 0, '', '');
    this.usersCollege = '';
  }

  ngOnInit()
  {
    this.af.auth.subscribe(auth => {
      this.af.database.object('/users/' + auth.auth.uid).subscribe(snapshot => {
        this.usersCollege = snapshot['college'];
      });
    });
  }

  post()
  {
    if(!this.postIsValid())
    {
      // TODO: toast an error message here
      return;
    }
    this.postToUsersCollegeNode();
    this.rediretAfterPost();
  }

  postToUsersCollegeNode()
  {
      let dict = {
                  'title': this.newPost.title,
                  'description': this.newPost.description,
                  'reward': this.newPost.reward,
                  'category': this.newPost.category,
                  'subCategory': this.newPost.category };
      this.af.database.list(`/posts/${this.usersCollege}/${this.newPost.category}/${this.newPost.subCategory}`).push(dict);
  }

  postIsValid(): boolean
  {
    // tslint:disable-next-line:max-line-length
    return (this.newPost.title !== '' && this.newPost.description !== '' && this.newPost.reward >= 0 && this.newPost.category !== '') ? true : false;
  }

  rediretAfterPost()
  {
    // TODO: Redirect to 'succesful-post' page
    this.router.navigate(['/square']);
  }

  ngOnDestroy()
  {
    this.af.auth.unsubscribe();
  }
}

/*
  |*-posts
      |
      |*-college
          |
          |*-market / transit / social
              |
              |*-autoId
                  |
                  |*-post-info {title, desc, views?, etc}
*/
