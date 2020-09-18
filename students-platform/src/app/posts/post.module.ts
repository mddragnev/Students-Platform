import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { IgniteUIModule } from '../igniteui.module';
import { UserPostsComponent } from './user-posts/user-posts.component';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    UserPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    IgniteUIModule
  ]
})
export class PostModule {}
