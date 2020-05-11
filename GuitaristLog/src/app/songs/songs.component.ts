import { Component, OnInit } from '@angular/core';
import { SongsService } from '../core/services/songs.service';
import { Song } from '../models/song.model';
import { Observable } from 'rxjs';
import { UserBankService } from '../core/services/user-bank.service';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewSongComponent } from './new-song/new-song.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent {

  constructor(private songsService: SongsService,
              private userBankService: UserBankService,
              private dialog: MatDialog) { }

  songsToLearn$: Observable<Song[]> = this.userBankService.getUserBank().pipe(
    switchMap(userBank => this.songsService.getFilteredSongs(userBank.learnedSongs))
  );
  learnedSongs$: Observable<Song[]> = this.userBankService.getUserBank().pipe(
    switchMap(userBank => this.songsService.getFilteredSongs(userBank.songsToLearn))
  );

  openNewSongModal() {
    this.dialog.open(NewSongComponent);
  }

}
