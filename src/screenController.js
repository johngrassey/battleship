import { gameController } from "./gameController.js";

class screenController {
  constructor() {
    this.gameController = new gameController();
  }

  updatePlayerBoard() {
    const board = this.gameController.activePlayer.board.getPlayerBoard();
    const boardDiv = document.querySelector("#playerboard .grid");
    boardDiv.innerHTML = "";
    board.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      row.forEach((cell) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        if (cell.length > 1) {
          cellDiv.classList.add("ship");
        }
        cellDiv.textContent = cell;
        rowDiv.appendChild(cellDiv);
      });
      boardDiv.appendChild(rowDiv);
    });
  }

  updateOppBoard() {
    const board = this.gameController.inactivePlayer.board.getOppBoard();
    const boardDiv = document.querySelector("#oppboard .grid");
    boardDiv.innerHTML = "";
    board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      row.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => {
          this.playTurn(rowIndex, cellIndex);
        });
        rowDiv.appendChild(cellDiv);
      });
      boardDiv.appendChild(rowDiv);
    });
  }

  playTurn(x, y) {
    const result = this.gameController.gameTurn(x, y);
    this.updateMessage(result);
  }

  passTurn() {
    this.updateOppBoard();
    this.updatePlayerBoard();
    this.clearMessage();
  }

  updateMessage(message) {
    const nextTurnBtn = document.querySelector("#nextturn");
    const messageDiv = document.querySelector("#message");
    messageDiv.innerHTML = "";
    messageDiv.textContent = message;
    nextTurnBtn.addEventListener("click", () => {
      this.passTurn();
    });
    nextTurnBtn.style.display = "block";
  }

  clearMessage() {
    const messageDiv = document.querySelector("#message");
    const nextTurnBtn = document.querySelector("#nextturn");
    messageDiv.innerHTML = "";
    nextTurnBtn.style.display = "none";
  }

  startGame() {
    this.gameController.populatePlayerOneBoard(this.gameController.player1);
    this.gameController.populatePlayerTwoBoard(this.gameController.player2);
    this.updatePlayerBoard();
    this.updateOppBoard();
  }
}

export { screenController };
