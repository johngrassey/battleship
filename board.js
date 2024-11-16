import { Ship } from "./ships.js";

class Board {
  constructor() {
    this.board = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
    this.ships = [
      new Ship("carrier", 5),
      new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("submarine", 3),
      new Ship("destroyer", 2),
    ];
  }

  getBoard() {
    return this.board;
  }

  placeShip(x, y, ship, direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship.name;
      }
    }

    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship.name;
      }
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === "") {
      this.board[x][y] = "O";
    } else if (this.board[x][y].length > 1) {
      this.board[x][y] = "X";
    }
  }
}

export { Board };
