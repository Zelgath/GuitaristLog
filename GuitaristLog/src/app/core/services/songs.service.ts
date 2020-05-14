import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from 'src/app/models/song.model';
import { AbstractFireService } from '../../models/abstractFireService';

@Injectable({
  providedIn: 'root'
})
export class SongsService extends AbstractFireService {
  private API_URL = '/songs';

  constructor(private db: AngularFireDatabase) {
    super();
  }

  getSongs(): Observable<Song[]> {
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

  getSearchedSongs(input: string): Observable<Song[]> {
    return this.db.list<Song>(this.API_URL).snapshotChanges().pipe(
      map(response => response.map(song => this.assignKey(song))),
      map(songs => songs.filter(song => this.filterSongs(input, song)))
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

  private filterSongs(input: string, song: Song) {
    return input.length > 2 ?
      song.public &&
      song.name.substr(0, input.length).toLowerCase()
        .includes((input + '').toLowerCase())
      : null;
  }
}
