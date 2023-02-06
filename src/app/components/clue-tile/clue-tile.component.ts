import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Clue } from "src/app/common/Game";

@Component({
  selector: "app-clue-tile",
  templateUrl: "./clue-tile.component.html",
  styleUrls: ["./clue-tile.component.css"],
})
export class ClueTileComponent implements OnInit {
  clue?: Clue;
  round?: number;
  hasBeenClicked: boolean = false;
  clueValue1: string[] = ["$200", "$400", "$600", "$800", "$1000"];
  clueValue2: string[] = ["$400", "$800", "$1200", "$1600", "$2000"];

  @Input()
  set setClue(clue: Clue | undefined) {
    this.clue = clue;
  }

  @Input()
  set setRound(round: number) {
    this.round = round;
  }

  @Input()
  set setHasBeenClicked(hasBeenClicked: boolean) {
    this.hasBeenClicked = hasBeenClicked;
  }

  @Output()
  clueEmitter = new EventEmitter<Clue>();

  constructor() {}

  ngOnInit(): void {}

  onClueClick() {
    this.hasBeenClicked = true;
    this.clueEmitter.emit(this.clue);
  }
}
