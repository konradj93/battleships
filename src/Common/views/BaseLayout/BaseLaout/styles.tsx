import { styled } from '@mui/material/styles';

export const FullPageContainer = styled('div')<{ isTablet: boolean }>(
  ({ theme, isTablet }) => ({
    padding: isTablet ? theme.spacing(5) : theme.spacing(2),
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
);
