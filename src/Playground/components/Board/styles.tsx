import { styled } from '@mui/material/styles';
import hitImg from '../../../assets/hit.png';
import missImg from '../../../assets/missSmall.png';
import { CellState } from '../../models';

const IMAGES = {
  hit: hitImg,
  miss: missImg,
};

export const BoardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, minmax(40px, 1fr))',
  gridTemplateRows: 'repeat(10, minmax(40px, 1fr))',
  justifyContent: 'center',
  margin: '0 auto',
  maxWidth: '420px',
  border: '5px solid #e8ba10',
  '@media only screen and (max-width: 600px)': {
    gridTemplateColumns: 'repeat(10, minmax(30px, 1fr))',
    gridTemplateRows: 'repeat(10, minmax(30px, 1fr))',
  },
});

export const Row = styled('div')({
  width: `100%`,
  height: `100%`,
  'first-of-type .board__cell': {
    borderLeft: `1px solid black`,
  },
  '.board__cell:first-of-type': {
    borderTop: `1px solid black`,
  },
});

export const Cell = styled('div')<{ hit: CellState }>(({ hit }) => ({
  backgroundPosition: 'center center',
  borderRight: '1px solid black',
  borderBottom: '1px solid black',
  width: '100%',
  height: '100%',
  backgroundImage: hit === 'empty' ? 'none' : `url(${IMAGES[hit]})`,
  backgroundSize: hit === 'hit' ? 'cover' : '75%',
  backgroundRepeat: 'no-repeat',
}));
