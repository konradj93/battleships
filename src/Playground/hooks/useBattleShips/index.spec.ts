import { renderHook, act, waitFor } from '@testing-library/react';
import { useBattleShips } from './index';
import { ShipType } from '../../models';
import { BOARD_SIZE } from '../../constans/board';

describe('useBattleShips', () => {
  const shipLayouts = [
    {
      shipType: ShipType.Carrier,
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      size: 5,
    },
    {
      shipType: ShipType.Battleship,
      positions: [
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
      ],
      size: 4,
    },
    {
      shipType: ShipType.Destroyer,
      positions: [
        [7, 1],
        [7, 2],
        [7, 3],
      ],
      size: 3,
    },
  ];

  test('should initialize boardState with empty cells', () => {
    const { result } = renderHook(() => useBattleShips(shipLayouts));
    const { boardState } = result.current;

    expect(boardState.cells.length).toBe(BOARD_SIZE);
    expect(boardState.cells.every((row) => row.length === BOARD_SIZE)).toBe(
      true,
    );
    expect(
      boardState.cells.every((row) =>
        row.every((cell) => cell.state === 'empty'),
      ),
    ).toBe(true);
  });

  test('should handle cell click correctly', () => {
    const { result } = renderHook(() => useBattleShips(shipLayouts));
    const { handleCellClick, boardState } = result.current;

    act(() => {
      handleCellClick(0, 0);
    });

    expect(boardState.cells[0][0].state).toBe('hit');

    act(() => {
      handleCellClick(1, 1);
    });

    expect(boardState.cells[1][1].state).toBe('miss');
  });

  test('should update shipsState correctly when ships are sunk', async () => {
    const { result } = renderHook(() => useBattleShips(shipLayouts));
    const { handleCellClick, shipsState } = result.current;

    expect(shipsState.length).toBe(3);
    expect(shipsState.every((ship) => ship.hits === 0)).toBe(true);

    act(() => {
      handleCellClick(0, 0);
      handleCellClick(0, 1);
      handleCellClick(0, 2);
      handleCellClick(0, 3);
      handleCellClick(0, 4);
    });
    await waitFor(() => {
      expect(result.current.shipsState[0].hits).toBe(5);
    });

    expect(result.current.shipsState[0].size).toBe(5);
  });
});
