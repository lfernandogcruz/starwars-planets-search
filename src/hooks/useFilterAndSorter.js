import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function useFilterAndSorter() {
  const { filters,
    filteredPlanets,
    setFinalPlanetList } = useContext(PlanetsContext);

  useEffect(() => {
    const finalList = filters.reduce((acc, filter) => acc.filter((planet) => {
      switch (filter.comparison) {
      case 'maior que':
        return planet[filter.column] > Number(filter.value);
      case 'menor que':
        return planet[filter.column] < Number(filter.value);
      case 'igual a':
        return planet[filter.column] === Number(filter.value);
      default:
        return true;
      }
    }), filteredPlanets);
    setFinalPlanetList(finalList);
  }, [filters, filteredPlanets, setFinalPlanetList]);
}

export default useFilterAndSorter;
