import { NgModule } from '@angular/core';

import {
  IgxListModule,
  IgxButtonModule,
  IgxProgressBarModule,
  IgxInputGroupModule,
  IgxCardModule,
  IgxDialogModule,
} from 'igniteui-angular';

@NgModule({
  imports: [
    IgxListModule,
    IgxButtonModule,
    IgxProgressBarModule,
    IgxInputGroupModule,
    IgxCardModule,
    IgxDialogModule
  ],
  exports: [
    IgxListModule,
    IgxButtonModule,
    IgxProgressBarModule,
    IgxInputGroupModule,
    IgxCardModule,
    IgxDialogModule
  ]
})
export class IgniteUIModule { }
