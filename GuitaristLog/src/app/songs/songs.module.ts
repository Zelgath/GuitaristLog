import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { SongsRoutingModule } from './songs-routing.module';
import { MaterialModule } from '../material/material.module';
import { SongCardComponent } from './song-card/song-card.component';


@NgModule({
  declarations: [SongsComponent, SongCardComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MaterialModule
  ]
})
export class SongsModule { }
