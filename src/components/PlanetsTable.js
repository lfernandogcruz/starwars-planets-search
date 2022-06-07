import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsTable() {
  const { data: planets } = useContext(PlanetsContext);

  const planetsTableHeader = Object.keys(planets[0] || {})
    .filter((key) => key !== 'residents');

  return (
    // <p>{console.log(planetsTableHeader)}</p>
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
          planets.map((planet) => (
            <tr key={ planet.name }>
              {
                planetsTableHeader.map((text) => (
                  <td key={ text }>{ planet[text] }</td>
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
