import { useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function useQueryInput() {
  const { data: planets, textInputValue, setLoading } = useContext(PlanetsContext);
  // const [textInputValue] = useState();

  useEffect(() => {
    setLoading(true);
    const filteredPlanetList = planets
      .filter((planet) => planet.name
        .toLowerCase().includes(textInputValue));
    // console.log(textInputValue);
    // console.log(planets);
    // console.log(filteredPlanetList);
    setLoading(false);
    return filteredPlanetList;
  }, [setLoading, textInputValue, planets]);
}

export default useQueryInput;
