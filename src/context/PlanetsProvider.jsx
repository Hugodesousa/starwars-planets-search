import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import fatchPlanetsList from '../services/fatchPlanetsList';

function PlanetsProvider({ children }) {
  const initialFilterNumber = {
    selectColumn: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
    // addFilter: false,
  };

  // const [addNewFilter, setAddNewFilter] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(initialFilterNumber);

  const getPlanets = async () => {
    const list = await fatchPlanetsList();
    const filterResidents = list.results.map((planet) => {
      const { residents, ...rest } = planet;
      return rest;
    });
    // setAddNewFilter(filterResidents);
    setPlanetList(filterResidents);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const filterForInputText = planetList.filter((planet) => (
    planet.name.includes(filterText)
  ));

  const filterForNumer = () => {
    const { selectColumn, comparisonFilter, valueFilter } = filterNumber;
    // if (comparisonFilter === 'maior que') {
    //   const test = filterForInputText.filter((planet) => (
    //     planet[selectColumn] > valueFilter
    //   ));
    // console.log(planetList[0].selectColumn);
    // }
    const maiorQ = planetList.filter((planet) => (
      Number(planet[selectColumn]) > Number(valueFilter)
    ));
    const menorQ = planetList.filter((planet) => (
      Number(planet[selectColumn]) < Number(valueFilter)
    ));
    const igualA = planetList.filter((planet) => (
      planet[selectColumn] === valueFilter
    ));

    switch (comparisonFilter) {
    case 'menor que':
      return setPlanetList(menorQ);
    case 'igual a':
      return setPlanetList(igualA);
    default:
      return setPlanetList(maiorQ);
    }
  };

  const myInitialConstext = {
    list: filterForInputText,
    filterText,
    setFilterText,
    filterNumber,
    setFilterNumber,
    filterForNumer,
  };

  return (
    <PlanetsContext.Provider value={ myInitialConstext }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default PlanetsProvider;
