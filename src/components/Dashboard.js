import React, { useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Dashboard() {
  const { filterByNumericValues, setFilterByNumericValues,
    filterTags, setFilterTags,
    numericColumnValue, setnumericColumnValue,
    numericComparisonValue, setnumericComparisonValue,
    numericInputValue, setNumericInputValue } = useContext(PlanetsContext);
  // const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  // const initialFilterTags = {
  //   population: true,
  //   orbital_period: true,
  //   diameter: true,
  //   rotation_period: true,
  //   surface_water: true,
  // };

  // const [filterTags, setFilterTags] = useState(initialFilterTags);
  // const [numericColumnValue, setnumericColumnValue] = useState('population');
  // const [numericComparisonValue, setnumericComparisonValue] = useState('maior que');
  // const [numericInputValue, setNumericInputValue] = useState(0);

  useEffect(() => {
    setNumericInputValue(0);
  }, [filterByNumericValues, setNumericInputValue]);

  const handleFilterBtn = ({ target }) => {
    // console.log(target);
    // console.log(target.form);
    // console.log(target.form[0]);
    // console.log(target.form[0].value);
    const numericFilter = {
      column: numericColumnValue,
      comparison: numericComparisonValue,
      value: numericInputValue,
    };
    setFilterTags({ ...filterTags, [target.form[0].value]: false });
    setFilterByNumericValues([...filterByNumericValues, numericFilter]);
  };

  const renderOptions = (tag) => (
    <option key={ tag } value={ tag }>
      { tag }
    </option>
  );

  return (
    <>
      <div>
        <form className="numeric-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ ({ target }) => setnumericColumnValue(target.value) }
          >
            {
              Object.keys(filterTags)
                .filter((key) => filterTags[key])
                .map((tag) => renderOptions(tag))
            }
          </select>
          <select
            id="operator-filter"
            data-testid="comparison-filter"
            onChange={ ({ target }) => setnumericComparisonValue(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
          <label htmlFor="input-filter">
            <input
              type="number"
              id="input-filter"
              data-testid="value-filter"
              onChange={ ({ target }) => setNumericInputValue(target.value) }
              value={ numericInputValue }
            />
          </label>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleFilterBtn }
            disabled={ Object.keys(filterTags).every((tag) => !filterTags[tag]) }
          >
            Filter
          </button>
        </form>
        <form className="sort-order">
          <select id="column-sort" data-testid="column-sort">
            {
              Object.keys(filterTags).map((tag) => renderOptions(tag))
            }
          </select>
          <label htmlFor="ascending">
            <input
              type="radio"
              id="ascending"
              name="sorting-order"
              value="ASC"
              data-testid="column-sort-input-asc"
            />
            Ascending
          </label>
          <label htmlFor="descending">
            <input
              type="radio"
              id="descending"
              name="sorting-order"
              value="DESC"
              data-testid="column-sort-input-desc"
              defaultChecked
            />
            Descending
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
          >
            Sort
          </button>
        </form>
      </div>
      <div>
        {filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <p>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
            <button
              type="button"
              onClick={ () => console.log('clicked') }
            >
              X
            </button>
          </div>
        ))}
        {filterByNumericValues.length > 0 && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ () => {
              setFilterByNumericValues([]);
              setFilterTags(initialFilterTags);
            } }
          >
            Remove filters
          </button>
        )}
      </div>
    </>
  );
}

export default Dashboard;
