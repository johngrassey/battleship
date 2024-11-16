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
  }

  getBoard() {
    return this.board;
  }

  placeShip(x, y, length, direction) {
    const ship = new Ship(length);

    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.board[x][y + i] = "S";
      }
    }

    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        this.board[x + i][y] = "S";
      }
    }
  }

  receiveAttack(x, y) {
    this.board[x][y] = this.board[x][y] === "S" ? "X" : "O";
  }
}

export { Board };
