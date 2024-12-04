import React from 'react';
import { ThemeProvider } from './Components/ThemProvider';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
