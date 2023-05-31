import { ShipType, ShipTypes } from '../../models';

export const SHIP_TYPES: ShipTypes = {
  [ShipType.Carrier]: { size: 5, count: 1 },
  [ShipType.Battleship]: { size: 4, count: 1 },
  [ShipType.Cruiser]: { size: 3, count: 1 },
  [ShipType.Submarine]: { size: 3, count: 1 },
  [ShipType.Destroyer]: { size: 2, count: 2 },
};
