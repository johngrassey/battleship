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
    expect(board.getPlayerBoard()).toEqual([
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

  test("clears the board", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.clearBoard();
    expect(board.getPlayerBoard()).toEqual([
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

  test("board clear also resets ship placement", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.clearBoard();
    expect(board.ships.carrier.placed).toEqual(false);
  });

  test("places ship horizontally on the board", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    expect(board.getPlayerBoard()).toEqual([
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

  test("places ship horizontally marks the ship as placed", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    expect(board.ships.carrier.placed).toEqual(true);
  });

  test("places ship vertically marks the ship as placed", () => {
    board.placeShip(0, 0, board.ships.carrier, "vertical");
    expect(board.ships.carrier.placed).toEqual(true);
  });

  test("places ship out of bounds horizontally on the board", () => {
    board.placeShip(0, 9, board.ships.carrier, "horizontal");
    expect(board.getPlayerBoard()).toEqual([
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

  test("places ship out of bounds vertically on the board", () => {
    board.placeShip(9, 0, board.ships.carrier, "vertical");
    expect(board.getPlayerBoard()).toEqual([
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

  test("places on another ship", () => {
    board.placeShip(0, 2, board.ships.battleship, "horizontal");
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    expect(board.getPlayerBoard()).toEqual([
      [
        "",
        "",
        "battleship",
        "battleship",
        "battleship",
        "battleship",
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

  test("places vertically on another ship", () => {
    board.placeShip(0, 2, board.ships.battleship, "horizontal");
    board.placeShip(0, 2, board.ships.carrier, "vertical");
    expect(board.getPlayerBoard()).toEqual([
      [
        "",
        "",
        "battleship",
        "battleship",
        "battleship",
        "battleship",
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
    expect(board.getPlayerBoard()).toEqual([
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
    expect(board.getPlayerBoard()).toEqual([
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
    expect(board.getPlayerBoard()[0][0]).toEqual("X");
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

  test("retrieve inactive player board", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.getOppBoard()).toEqual([
      ["X", "", "", "", "", "", "", "", "", ""],
      ["O", "", "", "", "", "", "", "", "", ""],
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

  test("attack ship and sink it", () => {
    board.placeShip(0, 0, board.ships.carrier, "horizontal");
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    board.receiveAttack(0, 3);
    expect(board.receiveAttack(0, 4)).toEqual("You sunk the carrier!");
  });
});
