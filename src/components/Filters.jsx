import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../Style/Filters.css';

function Filters() {
  const {
    filterText,
    setFilterText,
    filterNumber,
    setFilterNumber,
    filterForNumer,
    optionsFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    delFilter,
  } = useContext(PlanetsContext);

  const inputFilterText = ({ target }) => {
    setFilterText(target.value);
  };

  const selectFilterNumber = ({ target }) => {
    setFilterNumber({ ...filterNumber, [target.name]: target.value });
  };

  const clearAllFilters = () => {
    setFilterByNumericValues([]);
  };

  return (
    <div className="filterConteriner">
      <form>

        <label htmlFor="filterText">
          <input
            placeholder="Pesquisar"
            data-testid="name-filter"
            id="filterText"
            value={ filterText }
            onChange={ inputFilterText }
          />
        </label>

        <select
          name="selectColumn"
          data-testid="column-filter"
          value={ filterNumber.selectColumn }
          onChange={ selectFilterNumber }
        >
          {optionsFilters.map((opt) => (
            <option value={ opt } key={ opt }>{opt}</option>
          ))}
        </select>

        <select
          name="comparisonFilter"
          data-testid="comparison-filter"
          value={ filterNumber.comparisonFilter }
          onChange={ selectFilterNumber }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <label htmlFor="valueFilter">
          <input
            name="valueFilter"
            placeholder="0"
            data-testid="value-filter"
            id="valueFilter"
            type="number"
            value={ filterNumber.valueFilter }
            onChange={ selectFilterNumber }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterForNumer }
        >
          acionar o filtro
        </button>
        <button
          type="button"
          onClick={ clearAllFilters }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>

      </form>
      {filterByNumericValues.map((filter) => (
        <div key={ filter.columnSelect } data-testid="filter">
          <p>{filter.columnSelect}</p>
          <p>{filter.comparisonSelect}</p>
          <p>{filter.valueSelect}</p>
          <button
            type="button"
            onClick={ () => delFilter(filter.columnSelect) }
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
