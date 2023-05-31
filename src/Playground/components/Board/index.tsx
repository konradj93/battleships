import { ShipLayout } from '../../models';
import { useBattleShips } from '../../hooks/useBattleShips';
import { ShipList } from '../ShipsList';
import { BoardContainer, Cell, Row } from './styles';

export interface BoardProps {
  shipPlacement: ShipLayout[];
}

export const Board: React.FC<BoardProps> = ({ shipPlacement }) => {
  const { boardState, handleCellClick, shipsState } =
    useBattleShips(shipPlacement);
  return (
    <>
      <ShipList ships={shipsState} />
      <BoardContainer>
        {boardState.cells.map((row, rowIndex) => (
          <Row key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <Cell
                hit={cell.state}
                key={`cell-${rowIndex}-${colIndex}`}
                data-testid="board-cell"
                data-cell-state={cell.state}
                onClick={() => handleCellClick(rowIndex, colIndex)}></Cell>
            ))}
          </Row>
        ))}
      </BoardContainer>
    </>
  );
};
