import { gameController } from "./controllers";

describe("gameController", () => {
  let game;

  beforeEach(() => {
    game = new gameController();
  });

  test("switches player", () => {
    game.switchPlayer();
    expect(game.activePlayer).toBe(game.player2);
  });
});
