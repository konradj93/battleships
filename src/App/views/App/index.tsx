import ErrorBoundary from '../../../Common/components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BattleshipBoard } from '../../../Playground/views/BattleshipBoard';
import CssBaseline from '@mui/material/CssBaseline';

export const App = () => {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BattleshipBoard />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
