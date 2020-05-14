import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SongsService } from 'src/app/core/services/songs.service';
import { UserBankService } from 'src/app/core/services/user-bank.service';
import { Song } from 'src/app/models/song.model';
import { UserBank } from 'src/app/models/user-bank.model';

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
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data: UserBank) { }

  songForm: FormGroup;
  newSongKey: string;


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
    const learned: boolean = this.songForm.get('learned').value;
    const newSong: Song = {
      author: this.songForm.get('author').value,
      name: this.songForm.get('name').value,
      public: this.songForm.get('public').value,
      text: 'newText',
      key: null,
      creator: this.data.nickName
    };
    console.log(learned);
    this.songsService.addSong(newSong)
    .then(snap => this.newSongKey = snap.key)
    .then(() => learned ? this.data.songsToLearn.push(this.newSongKey) : this.data.learnedSongs.push(this.newSongKey))
    .then(() => this.userBankService.editUserBank(this.data.uid, this.data))
    .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    this.close();
    this.router.navigate(['/dashboard/songs', this.newSongKey]);
    this.toast.open('New Song has been successfully created!', '', {panelClass: 'toast-success'});
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

  close() {
    this.dialogRef.close();
  }
}
