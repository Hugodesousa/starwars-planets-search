import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import fatchPlanetsList from '../services/fatchPlanetsList';

function PlanetsProvider({ children }) {
  const initialFilterNumber = {
    selectColumn: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  };

  const optionsFiltersNumber = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsFilters, setOptionsFilters] = useState(optionsFiltersNumber);
  const [planetList, setPlanetList] = useState([]);
  const [backupPlanetList, setBackupPlanetList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(initialFilterNumber);

  useEffect(() => {
    const getPlanets = async () => {
      const list = await fatchPlanetsList();
      const filterResidents = list.results.map((planet) => {
        const { residents, ...rest } = planet;
        return rest;
      });
      setPlanetList(filterResidents);
      setBackupPlanetList(filterResidents);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let valuesRequest = backupPlanetList;
      filterByNumericValues.forEach((fil) => {
        switch (fil.comparisonSelect) {
        case 'menor que':
          valuesRequest = valuesRequest.filter((planet) => (
            planet[fil.columnSelect] < Number(fil.valueSelect)
          ));
          break;
        case 'igual a':
          valuesRequest = valuesRequest.filter((planet) => (
            planet[fil.columnSelect] === fil.valueSelect
          ));
          break;
        default:
          valuesRequest = valuesRequest.filter((planet) => (
            planet[fil.columnSelect] > Number(fil.valueSelect)
          ));
        }
      });
      setPlanetList(valuesRequest);
    };

    applyFilters();
  }, [filterByNumericValues]);

  const filterForNumer = () => {
    const { selectColumn, comparisonFilter, valueFilter } = filterNumber;

    setFilterByNumericValues([...filterByNumericValues,
      { columnSelect: selectColumn,
        comparisonSelect: comparisonFilter,
        valueSelect: valueFilter,
      }]);

    const optFilter = optionsFilters.filter((opt) => (
      !selectColumn.includes(opt)
    ));
    setOptionsFilters(optFilter);

    setFilterNumber({
      selectColumn: optFilter[0],
      comparisonFilter: 'maior que',
      valueFilter: '0',
    });
  };

  const delFilter = (column) => {
    const del = filterByNumericValues.filter((filter) => filter.columnSelect !== column);
    setFilterByNumericValues(del);
  };

  const filterForInputText = planetList.filter((planet) => (
    planet.name.includes(filterText)
  ));

  const myInitialConstext = {
    list: filterForInputText,
    filterText,
    setFilterText,
    filterNumber,
    setFilterNumber,
    filterForNumer,
    optionsFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    delFilter,
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
