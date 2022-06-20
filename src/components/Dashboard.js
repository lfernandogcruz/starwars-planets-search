import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Dashboard() {
  const { filterByNumericValues, setFilterByNumericValues,
    filterTags, setFilterTags, sorting, setSorting,
    sortingColumn, setSortingColumn,
    // numericColumnValue, setnumericColumnValue,
    // numericComparisonValue, setnumericComparisonValue,
    // numericInputValue, setNumericInputValue
  } = useContext(PlanetsContext);
  // const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const initialFilterTags = {
    population: true,
    orbital_period: true,
    diameter: true,
    rotation_period: true,
    surface_water: true,
  };

  // const [filterTags, setFilterTags] = useState(initialFilterTags);
  const [numericColumnValue, setnumericColumnValue] = useState('population');
  const [numericComparisonValue, setnumericComparisonValue] = useState('maior que');
  const [numericInputValue, setNumericInputValue] = useState(0);

  useEffect(() => {
    setNumericInputValue(0);
  }, [filterByNumericValues, setNumericInputValue]);

  useEffect(() => {
    setnumericColumnValue(Object.keys(filterTags).find((key) => filterTags[key]));
  }, [filterTags, setnumericColumnValue]);

  const handleExcludeFilter = (filter) => {
    const filteredMinusFilter = filterByNumericValues
      .filter((it) => it.column !== filter);
    setFilterTags({ ...filterTags, [filter]: true });
    setFilterByNumericValues(filteredMinusFilter);
  };

  const handleFilterBtn = () => {
    // console.log(target);
    // console.log(target.form);
    // console.log(target.form[0]);
    // console.log(target.form[0].value);
    const numericFilter = {
      column: numericColumnValue,
      comparison: numericComparisonValue,
      value: numericInputValue,
    };
    setFilterTags({ ...filterTags, [numericColumnValue]: false });
    setFilterByNumericValues([...filterByNumericValues, numericFilter]);
  };

  const renderOptions = (tag) => (
    <option key={ tag } value={ tag }>
      { tag }
    </option>
  );

  const resetSorting = {
    name: false,
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  };
  // useEffect(() => {
    // console.log('raw', sorting);
    // console.log('entries', Object.entries(sorting));
    // console.log('keys', Object.keys(sorting));
    // console.log('values', Object.values(sorting));
  // }, [sorting]);

  // const [sortReseted, setSortReseted] = useState(false);

  const handleSortBtn = (column) => {
    Object.keys(resetSorting).forEach((sorter) => {
      // console.log('sorter', sorter);
      // console.log('sortingColumn', sortingColumn);
      // setSorting({ ...sorting, [sorter]: false });
      if (sorter === column) {
        setSorting({ ...sorting, [sorter]: true });
      } else {
        setSorting({ ...sorting, [sorter]: false });
      }
    });
    // setSorting(resetSorting);
    // setSortReseted(true);
  };

  // useEffect(() => {
  //   if (!sortReseted) {
  //     return;
  //   }
  //   setSorting({ ...sorting, [sortingColumn]: true });
  // }, [setSorting, sortReseted]);

  return (
    <>
      <div>
        <form className="numeric-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ ({ target }) => setnumericColumnValue(target.value) }
            value={ numericColumnValue }
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
          <select
            id="column-sort"
            data-testid="column-sort"
            onChange={ ({ target }) => setSortingColumn(target.value) }
            value={ sortingColumn }
          >
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
            onClick={ () => handleSortBtn(sortingColumn) }
          >
            Sort
          </button>
        </form>
      </div>
      <div>
        {filterByNumericValues
        // Object.keys(filterTags)
          // .filter((tag) => !filterTags[tag])
          .map((filter) => (
            <div key={ filter.column } data-testid="filter">
              <p>
                {`${filter.column} ${filter.comparison} ${filter.value}`}
              </p>
              <button
                type="button"
                onClick={ () => handleExcludeFilter(filter.column) }
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
