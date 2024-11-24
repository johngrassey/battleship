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
    this.updateOppBoard();
    this.updateMessage(result);
  }

  passTurn() {
    this.gameController.switchPlayer();
    this.updateOppBoard();
    this.updatePlayerBoard();
    this.clearMessage();
    this.closeModal();
  }

  updateMessage(message) {
    const nextTurnBtn = document.querySelector("#endturn");
    const messageDiv = document.querySelector("#message");
    const passDialog = document.querySelector("#passturn");
    messageDiv.innerHTML = "";
    messageDiv.textContent = message;
    nextTurnBtn.addEventListener("click", () => {
      passDialog.showModal();
    });
    nextTurnBtn.style.display = "block";
  }

  clearMessage() {
    const messageDiv = document.querySelector("#message");
    const nextTurnBtn = document.querySelector("#endturn");
    messageDiv.innerHTML = "";
    nextTurnBtn.style.display = "none";
  }

  closeModal() {
    const passDialog = document.querySelector("#passturn");
    passDialog.close();
  }

  renderScreen() {
    const passDialog = document.querySelector("#passturn");
    const passDialogBtn = document.querySelector("#passturnbtn");
    passDialogBtn.addEventListener("click", () => {
      this.passTurn();
    });
    passDialog.close();
  }

  initializeBtns() {
    const p1StartDiv = document.querySelector("#playerone-start");
    const p2StartDiv = document.querySelector("#playertwo-start");
    const oppBoard = document.querySelector("#oppboard");

    const randomizePOne = document.querySelector("#p1randomize");
    const randomizePTwo = document.querySelector("#p2randomize");

    randomizePOne.addEventListener("click", () => {
      this.gameController.populatePlayerBoard(this.gameController.player1);
      this.updatePlayerBoard();
    });

    randomizePTwo.addEventListener("click", () => {
      this.gameController.populatePlayerBoard(this.gameController.player2);
      this.updatePlayerBoard();
    });

    const p1StartBtn = document.querySelector("#p1start");
    const p2StartBtn = document.querySelector("#p2start");

    p1StartBtn.addEventListener("click", () => {
      this.gameController.switchPlayer();
      this.updatePlayerBoard();
      p1StartDiv.style.display = "none";
      p2StartDiv.style.display = "block";
    });

    p2StartBtn.addEventListener("click", () => {
      p2StartDiv.style.display = "none";
      oppBoard.style.display = "block";
      this.gameController.switchPlayer();
      this.startGame();
    });
  }

  startGame() {
    this.updatePlayerBoard();
    this.updateOppBoard();
    this.renderScreen();
  }

  initializeGame() {
    this.initializeBtns();
  }
}

export { screenController };
