import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: null }, // TODO: Add login component
      { path: 'register', component: null }, // TODO: Add register component
    ])
  ]
})
export class AuthModule { } 