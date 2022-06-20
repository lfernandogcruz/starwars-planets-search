import React from 'react';
import './App.css';
import PlanetsTable from './components/PlanetsTable';
import Header from './components/Header';
import PlanetsProvider from './context/PlanetsProvider';
import Dashboard from './components/Dashboard';

function App() {
  // ooopsie!
  return (
    <PlanetsProvider>
      <div className="App">
        <Header />
        <Dashboard />
        <PlanetsTable />
      </div>
    </PlanetsProvider>
  );
}

export default App;
