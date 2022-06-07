import React from 'react';
import './App.css';
import PlanetsTable from './components/PlanetsTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  // ooopsie!
  return (
    <PlanetsProvider>
      <span>Hello, App!</span>
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
