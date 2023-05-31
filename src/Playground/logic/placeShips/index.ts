import { BOARD_SIZE } from '../../constans/board';
import {
  ShipLayout,
  ShipPositions,
  ShipTypes,
  ShipType,
  ShipWithType,
} from '../../models';

export const generateShipPositions = (
  shipSize: number,
  boardSize: number,
  occupiedPositions: Set<string>,
) => {
  const positions: ShipPositions = [];

  const isHorizontal = Math.random() < 0.5;
  let row, col;

  if (isHorizontal) {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - shipSize + 1));
  } else {
    row = Math.floor(Math.random() * (boardSize - shipSize + 1));
    col = Math.floor(Math.random() * boardSize);
  }

  for (let i = 0; i < shipSize; i++) {
    const positionRow = isHorizontal ? row : row + i;
    const positionCol = isHorizontal ? col + i : col;

    if (
      positionRow >= 0 &&
      positionRow < boardSize &&
      positionCol >= 0 &&
      positionCol < boardSize &&
      !occupiedPositions.has(`${positionRow}-${positionCol}`)
    ) {
      positions.push([positionRow, positionCol]);
    } else {
      return null;
    }
  }

  return positions;
};

const generateShipsArray = (shipTypes: ShipTypes): ShipWithType[] => {
  return Object.entries(shipTypes).flatMap(([type, { size, count }]) =>
    Array(count).fill({ shipType: type as ShipType, size }),
  );
};
export const randomizeShipPositions = (shipTypes: ShipTypes): ShipLayout[] => {
  const boardSize = BOARD_SIZE;
  const board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(false));

  const occupiedPositions = new Set<string>();
  const availableShips = generateShipsArray(shipTypes);

  return availableShips.map((el) => {
    const { size, shipType } = el;
    let shipPositions = null;
    while (!shipPositions) {
      shipPositions = generateShipPositions(size, boardSize, occupiedPositions);
    }

    shipPositions.forEach(([row, col]) => {
      occupiedPositions.add(`${row}-${col}`);
      board[row][col] = true;
    });

    return { shipType, positions: shipPositions, size };
  });
};
