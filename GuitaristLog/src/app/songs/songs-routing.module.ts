import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SongsComponent } from './songs.component';

const routes: Routes = [
    { path: '', component: SongsComponent },
    // { path: ':key', component: EditFlightComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SongsRoutingModule {}
