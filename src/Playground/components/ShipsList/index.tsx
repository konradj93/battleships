import React from 'react';
import { PlacedShip } from '../../models';
import cruiser from '../../../assets/cruiserShape.png';
import hit from '../../../assets/hit.png';
import miss from '../../../assets/miss.png';
import {
  ShipHitIndicator,
  ShipImage,
  ShipItem,
  ShipListContainer,
} from './styles';

interface ShipListProps {
  ships: PlacedShip[];
}

export const ShipList: React.FC<ShipListProps> = ({ ships }) => {
  return (
    <ShipListContainer data-testid="ship-list">
      {ships.map((ship, i) => (
        <ShipItem key={`${ship.shipType}-${i}`} data-testid="ship-list-item">
          <ShipImage
            src={cruiser}
            alt={ship.shipType}
            data-testid="ship-list-image"
          />
          {[...Array(ship.hits)].map((_, index) => (
            <ShipHitIndicator
              key={index}
              src={hit}
              alt="hit"
              data-testid="ship-list-hit"
            />
          ))}
          {[...Array(ship.size - ship.hits)].map((_, index) => (
            <ShipHitIndicator
              key={index}
              src={miss}
              alt="miss"
              data-testid="ship-list-miss"
            />
          ))}
        </ShipItem>
      ))}
    </ShipListContainer>
  );
};
