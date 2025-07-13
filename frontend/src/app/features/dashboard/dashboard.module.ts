import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ])
  ]
})
export class DashboardModule { } 