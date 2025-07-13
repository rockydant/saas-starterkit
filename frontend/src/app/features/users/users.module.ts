import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
    ])
  ]
})
export class UsersModule { } 