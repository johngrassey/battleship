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
    this.ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      cruiser: new Ship("cruiser", 3),
      submarine: new Ship("submarine", 3),
      destroyer: new Ship("destroyer", 2),
    };
  }

  clearBoard() {
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
    for (let ship in this.ships) {
      this.ships[ship].placed = false;
    }
  }

  getPlayerBoard() {
    return this.board;
  }

  getOppBoard() {
    return this.board.map((row) => {
      return row.map((cell) => {
        if (cell === "O" || cell === "X") {
          return cell;
        } else {
          return "";
        }
      });
    });
  }

  // TODO: Handle out of bounds and overlapping ships

  placeShip(x, y, ship, direction) {
    if (direction === "horizontal") {
      if (y + ship.length > 10) {
        return;
      }
      if (this.board[x].slice(y, y + ship.length).join("") !== "") {
        return;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship.name;
      }
    }

    if (direction === "vertical") {
      if (x + ship.length > 10) {
        return;
      }
      if (
        this.board
          .slice(x, x + ship.length)
          .map((row) => row[y])
          .join("") !== ""
      ) {
        return;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship.name;
      }
    }
    ship.placed = true;
  }

  receiveAttack(x, y) {
    let value = this.board[x][y];
    if (value === "") {
      this.board[x][y] = "O";
      return "Miss!";
    } else if (value in this.ships) {
      this.ships[value].shipHit();
      this.board[x][y] = "X";
      if (this.ships[value].isSunk()) {
        return `You sunk the ${value}!`;
      }
      return "Hit!";
    }
  }

  allSunk() {
    for (let ship in this.ships) {
      if (!this.ships[ship].isSunk()) {
        return false;
      }
    }
    return true;
  }
}

export { Board };
