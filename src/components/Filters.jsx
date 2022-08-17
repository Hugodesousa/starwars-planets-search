import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';
// import fatchPlanetsList from '../services/fatchPlanetsList';
import '../Style/Filters.css';

function Filters() {
  // const [filterText, setfilterText] = useState('');

  const { filterText, setFilterText } = useContext(PlanetsContext);

  const inputFilterText = ({ target }) => {
    setFilterText(target.value);
  };

  return (
    <div className="filterConteriner">
      <label htmlFor="filterText">
        <input
          data-testid="name-filter"
          id="filterText"
          value={ filterText }
          onChange={ inputFilterText }
        />
      </label>
    </div>
  );
}

export default Filters;
