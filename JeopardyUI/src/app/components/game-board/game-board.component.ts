import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/Constants';
import { Game } from 'src/app/common/Game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  headerHeight: number = 50;

  data: Game = Constants.GAME;

  constructor() {}

  ngOnInit(): void {}

  onHeaderHeightChange(height: number) {
    if (height > this.headerHeight) {
      this.headerHeight = height;
    }
  }
}
