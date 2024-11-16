import { Ship } from "./ships";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("ship", 3);
  });

  test("ship has a name", () => {
    expect(ship.name).toBe("ship");
  });

  test("ship has a length", () => {
    expect(ship.length).toBe(3);
  });

  test("increments the hit count", () => {
    expect(ship.shipHit()).toBe(1);
  });

  test("sinks the ship when hit count equals length", () => {
    ship.shipHit();
    ship.shipHit();
    expect(ship.shipHit()).toBe(3);
    expect(ship.sunk).toBe(true);
  });

  test("calculate if ship is not sunken", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("calculate if ship is sunken", () => {
    ship.shipHit();
    ship.shipHit();
    ship.shipHit();
    expect(ship.isSunk()).toBe(true);
  });
});
