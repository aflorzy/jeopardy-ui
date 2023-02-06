import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ClueTileState } from "src/app/common/ClueTile";
import { Clue } from "src/app/common/Game";

@Component({
  selector: "app-clue-tile",
  templateUrl: "./clue-tile.component.html",
  styleUrls: ["./clue-tile.component.css"],
})
export class ClueTileComponent implements OnInit {
  clue?: Clue;
  round?: number;
  clicked: boolean = false;
  hover: boolean = false;
  clueTileState?: ClueTileState;
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
  set setClueTileState(clueTileState: ClueTileState | undefined) {
    if (clueTileState) {
      this.clueTileState = clueTileState;
    }
  }

  @Output()
  clueEmitter = new EventEmitter<Clue>();

  @Output()
  clueTileStateEmitter = new EventEmitter<ClueTileState>();

  constructor() {}

  ngOnInit(): void {}

  set setHover(hover: boolean) {
    this.hover = hover;
  }

  onClueClick() {
    this.clicked = true;
    this.clueEmitter.emit(this.clue);
  }

  handleStateClick(state: string) {
    if (this.clueTileState) {
      if (state === "correct") {
        this.clueTileState.correct = true;
        this.clueTileStateEmitter.emit(this.clueTileState);
      } else if (state === "incorrect") {
        this.clueTileState.correct = false;
        this.clueTileStateEmitter.emit(this.clueTileState);
      } else if (state === "reset") {
        this.clueTileState.clicked = false;
        this.clueTileStateEmitter.emit(this.clueTileState);
      }
    }
  }
}
