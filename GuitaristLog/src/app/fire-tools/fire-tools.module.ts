import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';


const FIRE_MODULES = [
  AngularFireDatabaseModule,
  AngularFireAuthModule,
  AngularFireAnalyticsModule,
  AngularFirestoreModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [FIRE_MODULES]
})
export class FireToolsModule { }
