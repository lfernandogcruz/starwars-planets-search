import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(data);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const initialFilterTags = {
    population: true,
    orbital_period: true,
    diameter: true,
    rotation_period: true,
    surface_water: true,
  };

  const [filterTags, setFilterTags] = useState(initialFilterTags);
  // const [numericColumnValue, setnumericColumnValue] = useState('population');
  // const [numericComparisonValue, setnumericComparisonValue] = useState('maior que');
  // const [numericInputValue, setNumericInputValue] = useState(0);
  const [finalPlanetList, setFinalPlanetList] = useState(filteredPlanets);

  const initialSorting = {
    name: true,
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  };
  const [sorting, setSorting] = useState(initialSorting);
  const [sortedPlanetList, setSortedPlanetList] = useState(finalPlanetList);
  const [sortingColumn, setSortingColumn] = useState('population');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const planetsListRaw = await fetch(endpoint);
        const { results } = await planetsListRaw.json();
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    loading,
    setLoading,
    textInputValue,
    setTextInputValue,
    filteredPlanets,
    setFilteredPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
    filterTags,
    setFilterTags,
    // numericColumnValue,
    // setnumericColumnValue,
    // numericComparisonValue,
    // setnumericComparisonValue,
    // numericInputValue,
    // setNumericInputValue,
    finalPlanetList,
    setFinalPlanetList,
    sorting,
    setSorting,
    sortedPlanetList,
    setSortedPlanetList,
    sortingColumn,
    setSortingColumn,
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
