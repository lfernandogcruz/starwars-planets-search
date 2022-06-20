import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import useQueryInput from '../hooks/useQueryInput';

const MINUS_ONE = -1;

function PlanetsTable() {
  const { data: planets, loading, finalPlanetList, filterByNumericValues,
    filteredPlanets, setFinalPlanetList, sorting,
    sortedPlanetList, setSortedPlanetList } = useContext(PlanetsContext);
  // const [inputValue] = useState();
  // const [loading] = useState(false);

  const planetsTableHeader = Object.keys(planets[0] || {})
    .filter((key) => key !== 'residents');

  useEffect(() => {
    // console.log(finalPlanetList);
    const sortBy = Object.keys(sorting).find((key) => sorting[key]);
    const sortedPlanets = finalPlanetList.sort((a, b) => {
      if (a[sortBy] > b[sortBy] || b[sortBy] === 'unknown') return 1;
      if (a[sortBy] < b[sortBy] || a[sortBy] === 'unknown') return MINUS_ONE;
      return 0;
    });
    setSortedPlanetList(sortedPlanets);
  }, [finalPlanetList, sorting, setSortedPlanetList]);

  // useQueryInput();
  // filteredPlanets
  useEffect(() => {
    // console.log(filterByNumericValues);
    // console.log(filterTags);
    const finalList = filterByNumericValues
      .reduce((acc, filter) => acc.filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(planet[filter.column]) < Number(filter.value);
        case 'igual a':
          return Number(planet[filter.column]) === Number(filter.value);
        default:
          return true;
        }
      }), filteredPlanets);
    setFinalPlanetList(finalList);
  }, [filterByNumericValues, filteredPlanets, setFinalPlanetList]);

  if (loading) {
    return (
      <p>Carregando. . . </p>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {
            planetsTableHeader.map((column) => (
              <th key={ column }>{ column }</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          sortedPlanetList.map((planet) => (
            <tr key={ planet.name }>
              {
                planetsTableHeader.map((text) => (
                  <td
                    key={ text }
                    data-testid={ `planet-${text}` }
                  >
                    { planet[text] }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default PlanetsTable;
