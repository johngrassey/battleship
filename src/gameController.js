import { Board } from "./board";
import { Player } from "./player";
import { Ship } from "./ships";

class gameController {
  constructor() {
    this.player1 = new Player("Player 1", "human");
    this.player2 = new Player("Player 2", "computer");
    this.activePlayer = this.player1;
    this.inactivePlayer = this.player2;
  }

  switchPlayer() {
    [this.activePlayer, this.inactivePlayer] = [
      this.inactivePlayer,
      this.activePlayer,
    ];
  }

  gameTurn(x, y) {
    const attackResult = this.inactivePlayer.board.receiveAttack(x, y);
    if (this.inactivePlayer.board.allSunk()) {
      return "Game Over!";
    }
    return attackResult;
  }

  populatePlayerBoard(player) {
    player.board.clearBoard();
    for (let ship in player.board.ships) {
      while (!player.board.ships[ship].placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        player.board.placeShip(x, y, player.board.ships[ship], direction);
      }
    }
  }
}

export { gameController };
