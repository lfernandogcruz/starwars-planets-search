import { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function useQueryInput() {
  const { data: planets } = useContext(PlanetsContext);
  const [textInputValue] = useState();

  useEffect(() => {
    const filteredPlanetList = planets
      .filter((planet) => planet.name
        .toLowerCase().includes(textInputValue));
    // console.log(textInputValue);
    // console.log(planets);
    // console.log(filteredPlanetList);
    return filteredPlanetList;
  }, [textInputValue, planets]);
}

export default useQueryInput;
