import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule.forChild([
      { path: '', component: SettingsComponent },
    ])
  ]
})
export class SettingsModule { } 