import { Component } from '@angular/core';
import { NewPostModel } from '../../models/new-post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent
{
  newPost: NewPostModel;
  constructor()
  {
    this.newPost = new NewPostModel('', '', -1, '', '');
  }

  post()
  {
    console.log(this.newPost.title);
    console.log(this.newPost.description);
    console.log(this.newPost.category);
    console.log(this.newPost.reward);
  }
}
