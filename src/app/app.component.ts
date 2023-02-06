import { Component } from "@angular/core";
import { Constants } from "./common/Constants";
import { Clue, Game } from "./common/Game";
import { GameService } from "./service/game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  round: number = 1;
  game: Game = Constants.GAME;
  activeClue?: Clue;
  reset: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    let game = localStorage.getItem("previous");
    if (game) {
      this.game = JSON.parse(game);
    }
  }

  handleRoundChange(e: any) {
    this.round = e.target.value;
  }

  getNewGame(method: string) {
    if (method === "random") {
      this.gameService.getRandomGame().subscribe({
        next: (res) => {
          this.game = res;
          localStorage.setItem("previous", JSON.stringify(res));
        },
        error: (e) => {
          console.error("Could not get game", e);
        },
      });
    }
  }

  resetBoard() {
    this.reset = !this.reset;
  }
}
