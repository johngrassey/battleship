import { Board } from "./board";
import { Player } from "./player";
import { Ship } from "./ships";

class gameController {
  constructor() {
    this.player1 = new Player("Player 1", "human");
    this.player2 = new Player("Player 2", "computer");
    this.activePlayer = this.player1;
  }

  switchPlayer() {
    this.activePlayer =
      this.activePlayer === this.player1 ? this.player2 : this.player1;
  }
}

export { gameController };
