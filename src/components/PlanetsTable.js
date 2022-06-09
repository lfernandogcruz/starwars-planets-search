import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useQueryInput from '../hooks/useQueryInput';

function PlanetsTable() {
  const { data: planets, loading, filteredPlanets } = useContext(PlanetsContext);
  // const [inputValue] = useState();
  // const [loading] = useState(false);

  const planetsTableHeader = Object.keys(planets[0] || {})
    .filter((key) => key !== 'residents');

  useQueryInput();

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
          filteredPlanets.map((planet) => (
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
