import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { BillingComponent } from './billing.component';

@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule.forChild([
      { path: '', component: BillingComponent },
    ])
  ]
})
export class BillingModule { } 