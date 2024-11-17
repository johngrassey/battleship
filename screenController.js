import { gameController } from "./gameController.js";

class screenController {
  constructor() {
    this.gameController = new gameController();
  }

  updatePlayerBoard() {
    const board = this.gameController.activePlayer.board.getBoard();
    const boardDiv = document.querySelector("#playerboard");
    boardDiv.innerHTML = "";
    board.forEach((row, i) => {
      console.log("bananas");
      row.forEach((cell, j) => {
        const cellDiv = document.createElement("div");
        cellDiv.textContent = cell;
        cellDiv.dataset.x = i;
        cellDiv.dataset.y = j;
        // cellDiv.addEventListener("click", (e) => {
        //   this.gameController.activePlayer.attack(
        //     parseInt(e.target.dataset.x),
        //     parseInt(e.target.dataset.y),
        //     this.gameController
        //   );
        //   this.updateActiveBoard();
        //   this.updateInactiveBoard();
        // });
        boardDiv.appendChild(cellDiv);
      });
    });
  }

  startGame() {
    this.gameController.populateBoard(this.gameController.player1);
    this.gameController.populateBoard(this.gameController.player2);
    this.updatePlayerBoard();
  }
}

export { screenController };
