import { gameController } from "./gameController.js";

class screenController {
  constructor() {
    this.gameController = new gameController();
    this.messageDiv = document.querySelector("#message");
    this.p1StartDiv = document.querySelector("#playerone-start");
    this.p2StartDiv = document.querySelector("#playertwo-start");
    this.p1StartBtn = document.querySelector("#p1start");
    this.p2StartBtn = document.querySelector("#p2start");
    this.oppBoard = document.querySelector("#oppboard");
    this.playerBoardDiv = document.querySelector("#playerboard .grid");
    this.oppBoardDiv = document.querySelector("#oppboard .grid");
    this.nextTurnBtn = document.querySelector("#endturn");
    this.passDialog = document.querySelector("#passturn");
    this.passDialogBtn = document.querySelector("#passturnbtn");
  }

  updatePlayerBoard() {
    const board = this.gameController.activePlayer.board.getPlayerBoard();
    this.playerBoardDiv.innerHTML = "";
    board.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      row.forEach((cell) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        if (cell.length > 1) {
          cellDiv.classList.add("ship");
        }
        if (cell === "X") {
          cellDiv.classList.add("hit");
        } else if (cell === "O") {
          cellDiv.classList.add("miss");
        }
        cellDiv.textContent = cell.charAt(0);
        rowDiv.appendChild(cellDiv);
      });
      this.playerBoardDiv.appendChild(rowDiv);
    });
  }

  updateOppBoard() {
    const board = this.gameController.inactivePlayer.board.getOppBoard();
    this.oppBoardDiv.innerHTML = "";
    board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      row.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        if (cell === "X") {
          cellDiv.classList.add("hit");
        } else if (cell === "O") {
          cellDiv.classList.add("miss");
        }
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => {
          this.playTurn(rowIndex, cellIndex);
        });
        rowDiv.appendChild(cellDiv);
      });
      this.oppBoardDiv.appendChild(rowDiv);
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
    this.messageDiv.innerHTML = "";
    this.messageDiv.textContent = message;
    this.nextTurnBtn.addEventListener("click", () => {
      this.passDialog.showModal();
    });
    this.nextTurnBtn.style.display = "block";
  }

  clearMessage() {
    this.messageDiv.innerHTML = "";
    this.nextTurnBtn.style.display = "none";
  }

  closeModal() {
    this.passDialog.close();
  }

  renderScreen() {
    this.passDialogBtn.addEventListener("click", () => {
      this.passTurn();
    });
    this.passDialog.close();
  }

  initializeBtns() {
    const randomizePOne = document.querySelector("#p1randomize");
    const randomizePTwo = document.querySelector("#p2randomize");

    this.gameController.populatePlayerBoard(this.gameController.player1);

    this.updatePlayerBoard();

    this.passDialogBtn.addEventListener("click", () => {
      this.passDialog.close();
    });

    randomizePOne.addEventListener("click", () => {
      this.gameController.populatePlayerBoard(this.gameController.player1);
      this.updatePlayerBoard();
    });

    randomizePTwo.addEventListener("click", () => {
      this.gameController.populatePlayerBoard(this.gameController.player2);
      this.updatePlayerBoard();
    });

    this.p1StartBtn.addEventListener("click", () => {
      this.gameController.switchPlayer();
      this.gameController.populatePlayerBoard(this.gameController.player2);
      this.updatePlayerBoard();
      this.p1StartDiv.style.display = "none";
      this.p2StartDiv.style.display = "flex";

      this.passDialog.showModal();
    });

    this.p2StartBtn.addEventListener("click", () => {
      this.p2StartDiv.style.display = "none";
      this.oppBoard.style.display = "block";
      this.gameController.switchPlayer();

      this.startGame();
      this.passDialog.showModal();
    });
  }

  startGame() {
    this.renderScreen();
    this.updatePlayerBoard();
    this.updateOppBoard();
  }

  initializeGame() {
    this.initializeBtns();
  }
}

export { screenController };
