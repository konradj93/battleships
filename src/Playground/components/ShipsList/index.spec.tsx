import { render } from '@testing-library/react';
import { ShipList } from './index';
import { PlacedShip, ShipType } from '../../models';

const ships: PlacedShip[] = [
  { shipType: ShipType.Cruiser, size: 3, hits: 1 },
  { shipType: ShipType.Battleship, size: 4, hits: 2 },
  { shipType: ShipType.Destroyer, size: 2, hits: 0 },
];

describe('ShipList', () => {
  test('renders ship list correctly', () => {
    const { getAllByTestId } = render(<ShipList ships={ships} />);

    // Check if the correct number of ships are rendered
    const shipItems = getAllByTestId('ship-list-item');
    expect(shipItems.length).toBe(ships.length);

    // Check if the ship images are rendered correctly
    const shipImages = getAllByTestId('ship-list-image');
    expect(shipImages.length).toBe(ships.length);

    // Check if the hit indicators are rendered correctly
    const hitIndicators = getAllByTestId('ship-list-hit');
    let totalHits = 0;
    ships.forEach((ship) => {
      totalHits += ship.hits;
    });
    expect(hitIndicators.length).toBe(totalHits);

    // Check if the miss indicators are rendered correctly
    const missIndicators = getAllByTestId('ship-list-miss');
    let totalMisses = 0;
    ships.forEach((ship) => {
      totalMisses += ship.size - ship.hits;
    });
    expect(missIndicators.length).toBe(totalMisses);
  });
});
