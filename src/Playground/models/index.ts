export interface ShipTypeBase {
  shipType: ShipType;
}

export interface PlacedShip extends Omit<Ship, 'count'>, ShipTypeBase {
  hits: number;
}

export type ShipPositions = number[][];

export interface ShipLayout extends ShipTypeBase {
  positions: ShipPositions;
  size: number;
}

export type CellState = 'empty' | 'miss' | 'hit';

export interface Cell {
  state: CellState;
}

export enum ShipType {
  Carrier = 'carrier',
  Battleship = 'battleship',
  Cruiser = 'cruiser',
  Submarine = 'submarine',
  Destroyer = 'destroyer',
}

export type ShipTypes = {
  [key in ShipType]: Ship;
};

export interface Ship {
  size: number;
  count: number;
}

export interface ShipWithType extends Ship, ShipTypeBase {}
