import { styled } from '@mui/material/styles';

export const ShipListContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  maxWidth: '300px',
});

export const ShipItem = styled('div')({
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
});

export const ShipImage = styled('img')({
  width: '100px',
});

export const ShipHitIndicator = styled('img')({
  width: '20px',
  height: '20px',
});
