import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const planetsListRaw = await fetch(endpoint);
        const { results } = await planetsListRaw.json();
        setData(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
