import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserBank } from 'src/app/models/user-bank.model';
import { AuthService } from './auth.service';
import { AbstractFireService } from '../../models/abstractFireService';

@Injectable({
  providedIn: 'root'
})
export class UserBankService extends AbstractFireService{
  private uidForTest = '6N1EIikZCaVaL8r4RB11UXA4bMy1';
  private API_URL = '/userBanks';

  constructor(private authService: AuthService,
              private db: AngularFireDatabase) {
                super();
              }

  getUserBank(): Observable<UserBank> {
    return this.db.object<UserBank>(`${this.API_URL}/${this.uidForTest}`).snapshotChanges()
    .pipe(
      map(userBank => this.assignKey(userBank))
      );
  }

  // getUserBank(): Observable<UserBank> {
  //   return this.db.object<UserBank>(`${this.API_URL}/${this.authService.getUserId()}`).snapshotChanges()
  //   .pipe(map(userBank => this.assignKey(userBank)));
  // }

  editUserBank(uid: string, userBank: UserBank) {
    return this.db.object<UserBank>(`${this.API_URL}/${this.uidForTest}`).update(userBank);
  }
  // editUserBank(uid: string, userBank: UserBank) {
  //   return this.db.object<UserBank>(`${this.API_URL}/${uid}`).update(userBank);
  // }

}
