import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsSerivce } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})

export class UserPostsComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public posts: Post[] = [];

  private postSub: Subscription;

  public isUserAuthenticated = false;
  public userId: string;
  private authStatusSub: Subscription;

  constructor(public postService: PostsSerivce, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    }, () => {
      this.isLoading = false;
    });
  }


    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
}
