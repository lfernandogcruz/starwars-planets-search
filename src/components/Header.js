import React, { useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { data: planets,
    textInputValue, setTextInputValue,
    setFilteredPlanets } = useContext(PlanetsContext);
  // const [textInputValue, setTextInputValue] = useState('');
  // const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    // console.log(textInputValue);
    const filteredPlanetList = planets
      .filter((planet) => planet.name
        .toLowerCase().includes(textInputValue));
    // console.log(filteredPlanetList);
    setFilteredPlanets(filteredPlanetList);
    // console.log(filteredPlanets);
  }, [planets, textInputValue, setFilteredPlanets]);

  const handleTextFilter = ({ target }) => {
    // console.log(target.value);
    setTextInputValue(target.value.toLowerCase());
  };

  return (
    <header>
      <h1>Star Wars Galactical Census</h1>
      <input
        type="text"
        className="text-input"
        placeholder="Search by planet's name"
        onChange={ handleTextFilter }
        data-testid="name-filter"
      />
    </header>
  );
}

export default Header;
