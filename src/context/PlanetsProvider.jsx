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

  const optionsFiltersNumber = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsFilters, setOptionsFilters] = useState(optionsFiltersNumber);
  const [planetList, setPlanetList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(initialFilterNumber);

  const getPlanets = async () => {
    const list = await fatchPlanetsList();
    const filterResidents = list.results.map((planet) => {
      const { residents, ...rest } = planet;
      return rest;
    });
    setPlanetList(filterResidents);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let valuesRequest = planetList;
      filterByNumericValues.forEach((fil) => {
        console.log(fil);
        const maiorQ = valuesRequest.filter((planet) => (
          planet[fil.columnSelect] > Number(fil.valueSelect)
        ));

        const menorQ = valuesRequest.filter((planet) => (
          planet[fil.columnSelect] < Number(fil.valueSelect)
        ));

        const igualA = valuesRequest.filter((planet) => (
          planet[fil.columnSelect] === fil.valueSelect
        ));

        switch (fil.comparisonSelect) {
        case 'menor que':
          valuesRequest = menorQ;
          break;
        case 'igual a':
          valuesRequest = igualA;
          break;
        default:
          valuesRequest = maiorQ;
        }
        console.log(valuesRequest);
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
    // filtersSave.push(...filtersSave, { selectColumn, comparisonFilter, valueFilter });

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
