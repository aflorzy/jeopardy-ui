import { Component, Input, OnInit } from "@angular/core";
import { ClueTileState } from "src/app/common/ClueTile";
import { Category, Clue, Game } from "src/app/common/Game";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.css"],
})
export class GameBoardComponent implements OnInit {
  headerHeight: number = 50;

  game?: Game;
  round?: number;
  activeClue: Clue | undefined;
  showText: number = 1;
  hasBeenClickedList1: ClueTileState[] = [];
  hasBeenClickedList2: ClueTileState[] = [];

  @Input()
  set setGame(game: Game | undefined) {
    this.game = game;
    if (game) {
      this.resetBoard();
    }
  }

  @Input()
  set setRound(round: number) {
    this.round = round;
    if (this.game) {
      if (
        (round === 1 && !this.hasBeenClickedList1) ||
        this.hasBeenClickedList1.length === 0
      ) {
        this.initHasBeenClicked(+round, this.game);
      }
      if (
        (round === 2 && !this.hasBeenClickedList2) ||
        this.hasBeenClickedList2.length === 0
      ) {
        this.initHasBeenClicked(+round, this.game);
      }
    }
  }

  @Input()
  set setReset(reset: boolean) {
    this.resetBoard();
  }

  constructor() {}

  ngOnInit(): void {}

  resetBoard() {
    if (this.game) {
      this.initHasBeenClicked(1, this.game);
      this.initHasBeenClicked(2, this.game);
    }
  }

  setActiveClue(clue: Clue | undefined) {
    this.activeClue = clue;
  }

  toggleShowCorrectResponse(clue: Clue) {
    this.setClicked(clue);
    this.activeClue = clue;
    switch (this.showText) {
      case 1:
        this.showText = 2;
        break;
      case 2:
        this.showText = 3;
        break;
      case 3:
        this.showText = 1;
        this.activeClue = undefined;
        break;
      default:
        this.showText = 1;
        this.activeClue = undefined;
    }
  }

  initHasBeenClicked(round: number, game: Game) {
    switch (round) {
      case 1:
        this.hasBeenClickedList1 = [];
        game.jeopardy.categories.forEach((category: Category) => {
          category.clues.forEach((clue: Clue) => {
            this.hasBeenClickedList1.push({
              boardPosition: {
                x: clue.boardPositionX,
                y: clue.boardPositionY,
              },
              clicked: false,
              correct: false,
            });
          });
        });
        break;
      case 2:
        this.hasBeenClickedList2 = [];
        game.doubleJeopardy.categories.forEach((category: Category) => {
          category.clues.forEach((clue: Clue) => {
            this.hasBeenClickedList2.push({
              boardPosition: {
                x: clue.boardPositionX,
                y: clue.boardPositionY,
              },
              clicked: false,
              correct: false,
            });
          });
        });
        break;
    }
  }

  setClicked(clue: Clue) {
    let clueTileState = this.getClueTileState(clue);
    if (clueTileState) {
      this.updateClueTileState({ ...clueTileState, clicked: true });
    }
  }

  setCorrectIncorrect(clue: Clue, response: string) {
    let clueTileState = this.getClueTileState(clue);
    if (clueTileState) {
      if (response === "correct") {
        this.updateClueTileState({ ...clueTileState, correct: true });
      } else if (response === "incorrect") {
        this.updateClueTileState({ ...clueTileState, correct: false });
      }
    }
  }

  getClueTileState(clue: Clue): ClueTileState | undefined {
    let hasBeenClickedList: ClueTileState[] = [];
    let round = this.round ? +this.round : 0;
    switch (round) {
      case 1:
        hasBeenClickedList = this.hasBeenClickedList1;
        break;
      case 2:
        hasBeenClickedList = this.hasBeenClickedList2;
        break;
    }

    hasBeenClickedList = hasBeenClickedList.filter(
      (item: ClueTileState) =>
        item.boardPosition.x == clue.boardPositionX &&
        item.boardPosition.y == clue.boardPositionY
    );

    return hasBeenClickedList && hasBeenClickedList.length > 0
      ? hasBeenClickedList[0]
      : undefined;
  }

  updateClueTileState(state: ClueTileState) {
    let round = this.round ? +this.round : 0;
    switch (round) {
      case 1:
        this.hasBeenClickedList1 = this.hasBeenClickedList1.map(
          (item: ClueTileState) => {
            if (
              item.boardPosition.x == state.boardPosition.x &&
              item.boardPosition.y == state.boardPosition.y
            ) {
              return state;
            } else {
              return item;
            }
          }
        );
        break;
      case 2:
        this.hasBeenClickedList2 = this.hasBeenClickedList2.map(
          (item: ClueTileState) => {
            if (
              item.boardPosition.x == state.boardPosition.x &&
              item.boardPosition.y == state.boardPosition.y
            ) {
              return state;
            } else {
              return item;
            }
          }
        );
        break;
    }
  }
}
