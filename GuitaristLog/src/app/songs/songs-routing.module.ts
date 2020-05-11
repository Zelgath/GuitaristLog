import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SongsComponent } from './songs.component';
import { EditSongComponent } from './edit-song/edit-song.component';

const routes: Routes = [
    { path: '', component: SongsComponent },
    { path: ':key', component: EditSongComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SongsRoutingModule {}
