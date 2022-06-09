import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        // setLoading({ loading: true });
        const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const planetsListRaw = await fetch(endpoint);
        const { results } = await planetsListRaw.json();
        setData(results);
        // setLoading({ loading: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    // filters: {
    //   text: '',
    //   rotation_period: false,
    //   orbital_period: false,
    //   diameter: false,
    //   population: false,
    //   surface_water: false,
    // },
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
