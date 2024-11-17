import { Board } from "./board";
import { Ship } from "./ships";

describe("Boardgame", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Board();
    ship = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      cruiser: new Ship("cruiser", 3),
      submarine: new Ship("submarine", 3),
      destroyer: new Ship("destroyer", 2),
    };
  });

  test("returns the board", () => {
    expect(board.getBoard()).toEqual([
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
    ]);
  });

  test("places ship horizontally on the board", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    expect(board.getBoard()).toEqual([
      [
        "carrier",
        "carrier",
        "carrier",
        "carrier",
        "carrier",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  test("places ship vertically on the board", () => {
    board.placeShip(0, 0, board.ships.carrier, "vertical");
    expect(board.getBoard()).toEqual([
      ["carrier", "", "", "", "", "", "", "", "", ""],
      ["carrier", "", "", "", "", "", "", "", "", ""],
      ["carrier", "", "", "", "", "", "", "", "", ""],
      ["carrier", "", "", "", "", "", "", "", "", ""],
      ["carrier", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  test("attack blank square on the board", () => {
    board.receiveAttack(0, 0);
    expect(board.getBoard()).toEqual([
      ["O", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  test("attack ship on the board", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.receiveAttack(0, 0);
    expect(board.getBoard()[0][0]).toEqual("X");
  });

  test("confirm all ships sunk", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.placeShip(1, 0, board.ships.battleship, "horizontal");
    board.placeShip(2, 0, board.ships.cruiser, "horizontal");
    board.placeShip(3, 0, board.ships.submarine, "horizontal");
    board.placeShip(4, 0, board.ships.destroyer, "horizontal");
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    board.receiveAttack(0, 3);
    board.receiveAttack(0, 4);
    board.receiveAttack(1, 0);
    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    board.receiveAttack(1, 3);
    board.receiveAttack(2, 0);
    board.receiveAttack(2, 1);
    board.receiveAttack(2, 2);
    board.receiveAttack(3, 0);
    board.receiveAttack(3, 1);
    board.receiveAttack(3, 2);
    board.receiveAttack(4, 0);
    board.receiveAttack(4, 1);
    expect(board.allSunk()).toEqual(true);
  });
});
