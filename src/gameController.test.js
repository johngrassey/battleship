import { gameController } from "./gameController";

describe("gameController", () => {
  let game;

  beforeEach(() => {
    game = new gameController();
  });

  test("switches player", () => {
    game.switchPlayer();
    expect(game.activePlayer).toBe(game.player2);
    expect(game.inactivePlayer).toBe(game.player1);
  });

  test("gameTurn returns 'Miss!' if attackResult is 'miss'", () => {
    game.inactivePlayer.board.board[0][0] = "";
    expect(game.gameTurn(0, 0)).toBe("Miss!");
  });

  test("gameTurn returns 'Hit!' if attackResult is not 'miss'", () => {
    game.inactivePlayer.board.board[0][0] = "carrier";
    expect(game.gameTurn(0, 0)).toBe("Hit!");
  });

  test("gameTurn switches player if attackResult is 'miss'", () => {
    game.inactivePlayer.board.board[0][0] = "";
    game.gameTurn(0, 0);
    expect(game.activePlayer).toBe(game.player2);
    expect(game.inactivePlayer).toBe(game.player1);
  });
});
