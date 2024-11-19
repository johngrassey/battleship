import { gameController } from "./gameController.js";

class screenController {
  constructor() {
    this.gameController = new gameController();
  }

  updatePlayerBoard() {
    const board = this.gameController.activePlayer.board.getBoard();
    const boardDiv = document.querySelector("#playerboard");
    board.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      row.forEach((cell) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        if (cell.length > 1) {
          cellDiv.classList.add("ship");
          cellDiv.textContent = cell;
        } else {
          cellDiv.textContent = cell;
        }
        rowDiv.appendChild(cellDiv);
      });
      boardDiv.appendChild(rowDiv);
    });
  }

  startGame() {
    this.gameController.populateBoard(this.gameController.player1);
    this.gameController.populateBoard(this.gameController.player2);
    this.updatePlayerBoard();
  }
}

export { screenController };
