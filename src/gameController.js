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
    if (attackResult === "miss") {
      return "Miss!";
    }
    if (this.activePlayer.board.allSunk()) {
      return "Game Over!";
    }
    return "Hit!";
  }

  populatePlayerOneBoard(player1) {
    player1.board.placeShip(0, 0, player1.board.ships.carrier, "horizontal");
    player1.board.placeShip(1, 0, player1.board.ships.battleship, "horizontal");
    player1.board.placeShip(2, 0, player1.board.ships.cruiser, "horizontal");
    player1.board.placeShip(3, 0, player1.board.ships.submarine, "horizontal");
    player1.board.placeShip(4, 0, player1.board.ships.destroyer, "horizontal");
  }

  populatePlayerTwoBoard(player1) {
    player1.board.placeShip(0, 0, player1.board.ships.carrier, "vertical");
    player1.board.placeShip(0, 1, player1.board.ships.battleship, "vertical");
    player1.board.placeShip(0, 2, player1.board.ships.cruiser, "vertical");
    player1.board.placeShip(0, 3, player1.board.ships.submarine, "vertical");
    player1.board.placeShip(0, 4, player1.board.ships.destroyer, "vertical");
  }
}

export { gameController };
