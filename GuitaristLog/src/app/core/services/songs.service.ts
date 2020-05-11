import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserBankService } from './user-bank.service';
import { Song } from 'src/app/models/song.model';
import { Observable } from 'rxjs';
import { filter, map, tap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private API_URL = '/songs';

  constructor(private db: AngularFireDatabase,
              private userBankService: UserBankService) { }

  getSongs(): Observable<Song []> {
    return this.db.list<Song>(this.API_URL).snapshotChanges().pipe(
      map(response => response.map(song => this.assignKey(song)))
    );
  }

  getSong(key: string): Observable<Song> {
    return this.db.object<Song>(`${this.API_URL}/${key}`).snapshotChanges().pipe(
      map(song => this.assignKey(song))
    );
  }

  getFilteredSongs(songKeys: string[]): Observable<Song[]> {
    return this.db.list<Song>(this.API_URL).snapshotChanges().pipe(
      map(response => response.map(song => this.assignKey(song))),
      map(songs => songs.filter(song => songKeys.includes(song.key + '')))
    );
  }

  addSong(song: Song) {
    return this.db.list<Song>(this.API_URL).push(song);
  }

  editSong(key: string, song: Song) {
    return this.db.object<Song>(`${this.API_URL}/${key}`).update(song);
  }

  removeSong(key: string) {
    return this.db.object<Song>(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(song): Song{
    return { ...song.payload.val(), key: song.key };
  }
}
