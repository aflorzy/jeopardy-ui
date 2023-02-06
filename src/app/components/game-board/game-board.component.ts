import { Component, Input, OnInit } from "@angular/core";
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
  hasBeenClickedList1: HasBeenClicked[] = [];
  hasBeenClickedList2: HasBeenClicked[] = [];

  @Input()
  set setGame(game: Game | undefined) {
    this.game = game;

    if (game) {
      this.resetBoard()
      // game.jeopardy.categories.forEach((category: Category) => {
      //   category.clues.forEach((clue: Clue) => {
      //     this.hasBeenClickedList1.push({
      //       boardPosition: { x: clue.boardPositionX, y: clue.boardPositionY },
      //       hasBeenClicked: false,
      //     });
      //   });
      // });

      // game.doubleJeopardy.categories.forEach((category: Category) => {
      //   category.clues.forEach((clue: Clue) => {
      //     this.hasBeenClickedList2.push({
      //       boardPosition: { x: clue.boardPositionX, y: clue.boardPositionY },
      //       hasBeenClicked: false,
      //     });
      //   });
      // });
    }
  }

  @Input()
  set setRound(round: number) {
    this.round = round;
    this.hasBeenClickedList1 = [];
    this.hasBeenClickedList2 = [];

    if (this.game) {
      this.initHasBeenClicked(+round, this.game);
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
      this.hasBeenClickedList1 = [];
      this.initHasBeenClicked(1, this.game);
      this.hasBeenClickedList2 = [];
      this.initHasBeenClicked(2, this.game);
    }
  }

  setActiveClue(clue: Clue | undefined) {
    this.activeClue = clue;
  }

  toggleShowCorrectResponse(clue: Clue) {
    this.setHasBeenClicked(clue);
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
        game.jeopardy.categories.forEach((category: Category) => {
          category.clues.forEach((clue: Clue) => {
            this.hasBeenClickedList1.push({
              boardPosition: {
                x: clue.boardPositionX,
                y: clue.boardPositionY,
              },
              hasBeenClicked: false,
            });
          });
        });
        break;
      case 2:
        game.doubleJeopardy.categories.forEach((category: Category) => {
          category.clues.forEach((clue: Clue) => {
            this.hasBeenClickedList2.push({
              boardPosition: {
                x: clue.boardPositionX,
                y: clue.boardPositionY,
              },
              hasBeenClicked: false,
            });
          });
        });
        break;
    }
  }

  setHasBeenClicked(clue: Clue) {
    let round = this.round ? +this.round : 0;
    switch (round) {
      case 1:
        this.hasBeenClickedList1.forEach((item: HasBeenClicked) => {
          if (
            item.boardPosition.x == clue.boardPositionX &&
            item.boardPosition.y == clue.boardPositionY
          ) {
            item.hasBeenClicked = true;
          }
        });
        break;
      case 2:
        this.hasBeenClickedList2.forEach((item: HasBeenClicked) => {
          if (
            item.boardPosition.x == clue.boardPositionX &&
            item.boardPosition.y == clue.boardPositionY
          ) {
            item.hasBeenClicked = true;
          }
        });
        break;
    }
  }

  getHasBeenClicked(clue: Clue): boolean {
    let hasBeenClickedList: HasBeenClicked[] = [];
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
      (item: HasBeenClicked) =>
        item.boardPosition.x == clue.boardPositionX &&
        item.boardPosition.y == clue.boardPositionY
    );

    return hasBeenClickedList && hasBeenClickedList.length > 0
      ? hasBeenClickedList[0].hasBeenClicked
      : false;
  }
}

export interface HasBeenClicked {
  boardPosition: { x: number; y: number };
  hasBeenClicked: boolean;
}
