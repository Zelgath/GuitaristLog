import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UserBank } from 'src/app/models/user-bank.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserBankService {
  private uidForTest = '6N1EIikZCaVaL8r4RB11UXA4bMy1';
  private API_URL = '/userBanks';

  constructor(private authService: AuthService,
              private db: AngularFireDatabase) { }

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

  private assignKey(userBank) {
    return { ...userBank.payload.val(), key: userBank.key };
  }
}
