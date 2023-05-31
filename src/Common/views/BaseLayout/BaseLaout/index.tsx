import { FC, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FullPageContainer } from './styles';

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  return <FullPageContainer isTablet={isTablet}>{children}</FullPageContainer>;
};
