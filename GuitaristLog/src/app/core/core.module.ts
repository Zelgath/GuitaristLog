import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [DashboardComponent]
})
export class CoreModule { }
