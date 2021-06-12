import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const API_URL = environment.apiURL + '/posts/';
@Injectable({ providedIn: 'root' })
export class PostsSerivce {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        API_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                creatorEmail: post.creatorEmail
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((postsData) => {
        this.posts = postsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: postsData.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      creatorEmail: string;
    }>(API_URL + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        API_URL,
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      // having a string image
      postData = {
        id,
        title,
        content,
        imagePath: image,
        creator: null,
        creatorEmail: null
      };
    }

    this.http
      .put(API_URL + id, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete(API_URL + id);
  }
}
