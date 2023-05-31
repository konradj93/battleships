import { render, fireEvent } from '@testing-library/react';
import { Board } from './index';
import { ShipLayout, ShipType } from '../../models';

const shipPlacement: ShipLayout[] = [
  {
    shipType: ShipType.Cruiser,
    positions: [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    size: 3,
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
];

describe('Board', () => {
  test('renders board correctly', () => {
    const { getAllByTestId, getByTestId } = render(
      <Board shipPlacement={shipPlacement} />,
    );

    // Check if the ship list is rendered
    const shipList = getByTestId('ship-list');
    expect(shipList).toBeInTheDocument();

    // Check if the board cells are rendered correctly
    const boardCells = getAllByTestId('board-cell');
    expect(boardCells.length).toBe(100); // Assuming a 10x10 board size

    // Check if the board cells have the correct cell state

    boardCells.forEach((cell) => {
      expect(cell).toHaveAttribute('data-cell-state', 'empty');
      fireEvent.click(cell);
      expect(cell).not.toHaveAttribute('data-cell-state', 'empty');
    });
  });

  test('handles cell click correctly', () => {
    const { getAllByTestId } = render(<Board shipPlacement={shipPlacement} />);

    // Simulate cell click on a ship position
    const cell = getAllByTestId('board-cell')[0];
    fireEvent.click(cell);

    // Check if the cell state is updated to 'hit'
    expect(cell).toHaveAttribute('data-cell-state', 'hit');
  });
});
