import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';
// import fatchPlanetsList from '../services/fatchPlanetsList';
import '../Style/Filters.css';

function Filters() {
  // const [filterText, setfilterText] = useState('');

  const { filterText,
    setFilterText,
    filterNumber,
    setFilterNumber,
    filterForNumer } = useContext(PlanetsContext);

  const inputFilterText = ({ target }) => {
    setFilterText(target.value);
  };

  const selectFilterNumber = ({ target }) => {
    setFilterNumber({ ...filterNumber, [target.name]: target.value });
  };

  const addNumberFilter = () => {
    setFilterNumber({ ...filterNumber, addFilter: true });
    filterForNumer();
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ addNumberFilter }
        >
          acionar o filtro
        </button>
      </form>
    </div>
  );
}

export default Filters;
