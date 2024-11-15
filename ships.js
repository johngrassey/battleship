class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }

  shipHit() {
    ++this.hitCount;
    this.sunk = this.hitCount === this.length;
    return this.hitCount;
  }

  isSunk() {
    return this.sunk;
  }
}

export { Ship };
