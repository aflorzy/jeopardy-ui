import { Component, Input, OnInit } from '@angular/core';
import { Clue } from 'src/app/common/Game';

@Component({
  selector: 'app-clue-tile',
  templateUrl: './clue-tile.component.html',
  styleUrls: ['./clue-tile.component.css'],
})
export class ClueTileComponent implements OnInit {
  clue?: Clue;

  @Input()
  set setClue(clue: Clue | undefined) {
    this.clue = clue;
  }

  constructor() {}

  ngOnInit(): void {}
}
