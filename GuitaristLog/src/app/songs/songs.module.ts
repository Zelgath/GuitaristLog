import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { SongsRoutingModule } from './songs-routing.module';
import { MaterialModule } from '../material/material.module';
import { SongCardComponent } from './song-card/song-card.component';
import { NewSongComponent } from './new-song/new-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SongsComponent, SongCardComponent, NewSongComponent, EditSongComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [NewSongComponent]
})
export class SongsModule { }
