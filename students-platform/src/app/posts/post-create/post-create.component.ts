import { Component } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsSerivce } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {


  constructor(public postService: PostsSerivce) {}

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const post: Post = {
      id: null,
      title : form.value.title,
      content: form.value.content
    };

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
