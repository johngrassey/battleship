import { Board } from "./board";

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.board = new Board();
  }
}

export { Player };
