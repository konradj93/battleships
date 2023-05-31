import { useState, useEffect, useCallback } from 'react';
import { Cell, PlacedShip, ShipLayout } from '../../models';
import { BOARD_SIZE } from '../../constans/board';

export interface BoardState {
  cells: Cell[][];
}

export const useBattleShips = (shipsPosition: ShipLayout[]) => {
  const [shipsState, setShipsState] = useState<PlacedShip[]>([]);
  const [boardState, setBoardState] = useState<BoardState>({
    cells: Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill({ state: 'empty' })),
  });

  const checkForSunkShips = useCallback(() => {
    const sunkShips = shipsPosition.reduce<PlacedShip[]>((acc, shipLayout) => {
      const hits = shipLayout.positions.reduce((hitCount, [row, col]) => {
        if (boardState.cells[row][col].state === 'hit') {
          return hitCount + 1;
        }
        return hitCount;
      }, 0);
      return [
        ...acc,
        { shipType: shipLayout.shipType, hits, size: shipLayout.size },
      ];
    }, []);
    setShipsState(sunkShips);
  }, [boardState.cells, shipsPosition]);

  const handleCellClick = (row: number, col: number) => {
    const cell = boardState.cells[row][col];
    if (cell.state === 'empty') {
      const isPartOfShip = shipsPosition.some((shipLayout) =>
        shipLayout.positions.some(
          ([positionRow, positionCol]) =>
            positionRow === row && positionCol === col,
        ),
      );
      const newCellState = isPartOfShip ? 'hit' : 'miss';

      setBoardState((prevState) => {
        const newCells = [...prevState.cells];
        newCells[row][col] = { state: newCellState };
        return { ...prevState, cells: newCells };
      });
    }
  };

  useEffect(() => {
    checkForSunkShips();
  }, [boardState.cells, checkForSunkShips]);
  return {
    boardState,
    handleCellClick,
    shipsState,
  };
};
