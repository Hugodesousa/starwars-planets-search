import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import fatchPlanetsList from '../services/fatchPlanetsList';

function PlanetsProvider({ children }) {
  const [planetList, setplanetList] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const list = await fatchPlanetsList();
      const filterResidents = list.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setplanetList(filterResidents);
    };
    getPlanets();
  }, []);

  const myInitialConst = {
    list: planetList,
    filterText,
    setFilterText,
  };

  return (
    <PlanetsContext.Provider value={ myInitialConst }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default PlanetsProvider;
