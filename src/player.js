import { Board } from "./board";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
  }
}

export { Player };
