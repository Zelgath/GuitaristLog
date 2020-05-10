import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { UserBankService } from 'src/app/core/services/user-bank.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.less']
})
export class SongCardComponent {

  constructor(private userBankService: UserBankService) { }

  @Input() song: Song;
}
