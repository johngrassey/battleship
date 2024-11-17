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

  populateBoard(player1) {
    player1.board.placeShip(0, 0, player1.board.ships.carrier, "horizontal");
    player1.board.placeShip(1, 0, player1.board.ships.battleship, "horizontal");
    player1.board.placeShip(2, 0, player1.board.ships.cruiser, "horizontal");
    player1.board.placeShip(3, 0, player1.board.ships.submarine, "horizontal");
    player1.board.placeShip(4, 0, player1.board.ships.destroyer, "horizontal");
  }

  populateBoard(player2) {
    player2.board.placeShip(0, 0, player2.board.ships.carrier, "vertical");
    player2.board.placeShip(0, 1, player2.board.ships.battleship, "vertical");
    player2.board.placeShip(0, 2, player2.board.ships.cruiser, "vertical");
    player2.board.placeShip(0, 3, player2.board.ships.submarine, "vertical");
    player2.board.placeShip(0, 4, player2.board.ships.destroyer, "vertical");
  }
}

export { gameController };