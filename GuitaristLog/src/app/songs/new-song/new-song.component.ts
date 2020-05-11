import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SongsService } from 'src/app/core/services/songs.service';
import { UserBankService } from 'src/app/core/services/user-bank.service';
import { Song } from 'src/app/models/song.model';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.less']
})
export class NewSongComponent implements OnInit{

  constructor(private dialogRef: MatDialogRef<NewSongComponent>,
              private toast: MatSnackBar,
              private formBuilder: FormBuilder,
              private songsService: SongsService,
              private userBankService: UserBankService,
              private router: Router) { }

  songForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.songForm = this.formBuilder.group({
      author: ['', Validators.required],
      name: ['', Validators.required],
      public: true,
      learned: false
    });
  }

  createSong() {
    const newSong: Song = {
      author: this.songForm.get('author').value,
      name: this.songForm.get('name').value,
      public: this.songForm.get('public').value,
      text: 'newText',
      key: null,
      creator: null
    };
    this.userBankService.getUserBank().pipe(
      tap(userBank => newSong.creator = userBank.nickName),
      switchMap(() => this.songsService.addSong(newSong).then(
        song => this.onCreatingSuccess(song.key).bind(this), this.onCreatingFailure.bind(this)
      )
      )
    );
  }

  private onCreatingSuccess(key: string) {
    this.toast.open('New Song has been successfully created!', '', {panelClass: 'toast-success'});
    this.close();
    this.router.navigate(['/dashboard/songs', key]);
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

  private navigateToNewSong(key: string) {
    this.router.navigate(['/dashboard/songs', key]);
  }

  close() {
    this.dialogRef.close();
  }
}
