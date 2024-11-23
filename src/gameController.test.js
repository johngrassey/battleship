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
});
