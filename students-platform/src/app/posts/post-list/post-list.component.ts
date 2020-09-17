import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsSerivce } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public posts: Post[] = [];
  public totalPosts = 0;
  public postsPerPage = 2;
  public pageSizeOptions = [1, 2, 5, 10];
  public currentPage = 1;
  private postSub: Subscription;

  public isUserAuthenticated = false;
  public userId: string;
  private authStatusSub: Subscription;

  constructor(public postService: PostsSerivce, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.posts = postData.posts;
        this.isLoading = false;
        this.totalPosts = postData.postCount;
      });
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    }, () => {
      this.isLoading = false;
    });
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id)
    .subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

    ngOnDestroy() {
      this.postSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }
}
