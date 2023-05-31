import { BOARD_SIZE } from '../../constans/board';
import { ShipType, ShipTypes } from '../../models';
import { generateShipPositions, randomizeShipPositions } from './index';

describe('generateShipPositions', () => {
  test('should generate ship positions correctly', () => {
    const shipSize = 3;
    const boardSize = BOARD_SIZE;
    const occupiedPositions = new Set<string>();
    const positions = generateShipPositions(
      shipSize,
      boardSize,
      occupiedPositions,
    );

    expect(positions).toBeTruthy();
    expect(positions).toHaveLength(shipSize);

    positions!.forEach(([row, col]) => {
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThan(boardSize);
      expect(col).toBeGreaterThanOrEqual(0);
      expect(col).toBeLessThan(boardSize);
      expect(occupiedPositions.has(`${row}-${col}`)).toBeFalsy();
    });
  });
});

describe('randomizeShipPositions', () => {
  test('should randomize ship positions correctly', () => {
    const shipTypes: ShipTypes = {
      [ShipType.Carrier]: { size: 5, count: 1 },
      [ShipType.Battleship]: { size: 4, count: 1 },
      [ShipType.Cruiser]: { size: 3, count: 1 },
      [ShipType.Submarine]: { size: 3, count: 1 },
      [ShipType.Destroyer]: { size: 2, count: 1 },
    };

    const shipLayouts = randomizeShipPositions(shipTypes);

    expect(shipLayouts).toBeTruthy();
    expect(shipLayouts).toHaveLength(Object.keys(shipTypes).length);

    shipLayouts.forEach((shipLayout) => {
      const { shipType, positions } = shipLayout;

      expect(shipType).toBeDefined();
      expect(positions).toBeTruthy();
      expect(positions).toHaveLength(shipTypes[shipType].size);

      positions.forEach(([row, col]) => {
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(BOARD_SIZE);
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(BOARD_SIZE);
      });
    });
  });
  test('should contains two  ShipType.Carrier', () => {
    const shipTypes: ShipTypes = {
      [ShipType.Carrier]: { size: 5, count: 2 },
      [ShipType.Battleship]: { size: 4, count: 1 },
      [ShipType.Cruiser]: { size: 3, count: 1 },
      [ShipType.Submarine]: { size: 3, count: 1 },
      [ShipType.Destroyer]: { size: 2, count: 1 },
    };

    const shipLayouts = randomizeShipPositions(shipTypes);

    expect(shipLayouts).toBeTruthy();
    // + 1 because carrier ship count is equal 2
    expect(shipLayouts).toHaveLength(Object.keys(shipTypes).length + 1);

    const carriers = shipLayouts.filter(
      (shipLayout) => shipLayout.shipType === ShipType.Carrier,
    );

    expect(carriers).toHaveLength(2);
  });
});
