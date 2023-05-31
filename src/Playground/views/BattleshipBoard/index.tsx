import { BaseLayout } from '../../../Common/views/BaseLayout/BaseLaout';
import { Board } from '../../components/Board';
import { SHIP_TYPES } from '../../constans/ships';
import { randomizeShipPositions } from '../../logic/placeShips';

export const BattleshipBoard = () => {
  return (
    <BaseLayout>
      <Board shipPlacement={randomizeShipPositions(SHIP_TYPES)} />
    </BaseLayout>
  );
};
