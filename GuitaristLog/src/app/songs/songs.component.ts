import { Component, OnInit } from '@angular/core';
import { SongsService } from '../core/services/songs.service';
import { Song } from '../models/song.model';
import { Observable, of } from 'rxjs';
import { UserBankService } from '../core/services/user-bank.service';
import { switchMap, tap, debounceTime, filter, takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewSongComponent } from './new-song/new-song.component';
import { UserBank } from '../models/user-bank.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit{

  constructor(private songsService: SongsService,
              private userBankService: UserBankService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) { }
  user: UserBank;
  searchedSongForm: FormGroup;
  foundSongs: Observable<Song[]>;
  songsToLearn$: Observable<Song[]> = this.userBankService.getUserBank().pipe(
    tap(userBank => this.user = userBank),
    switchMap(userBank => this.songsService.getFilteredSongs(userBank.learnedSongs))
  );
  learnedSongs$: Observable<Song[]> = this.userBankService.getUserBank().pipe(
    switchMap(userBank => this.songsService.getFilteredSongs(userBank.songsToLearn))
  );

  ngOnInit() {
    this.buildForm();

    this.foundSongs = this.searchSongs();
  }

  private buildForm() {
    this.searchedSongForm = this.formBuilder.group({
      name: '',
      author: '',
      creator: ''
    });
  }

  openNewSongModal() {
    this.dialog.open(NewSongComponent, {data: this.user});
  }

  get name(): string {
    return this.searchedSongForm.get('name').value;
  }

  displayFn(song: Song): string {
    return song && song.name ? song.name : '';
  }

  private searchSongs() {
    return this.name.length > 2 ?
    null :
    this.searchedSongForm.get('name').valueChanges.pipe(
      debounceTime(300),
      switchMap(input => this.songsService.getSearchedSongs(input))
    );
  }


}
