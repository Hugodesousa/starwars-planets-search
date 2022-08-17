import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../Style/Table.css';
// import PropTypes from 'prop-types';
// import fatchPlanetsList from '../services/fatchPlanetsList';

function Table() {
  // useEffect(() => {

  // }, []);

  const { list, filterText } = useContext(PlanetsContext);
  const filter = list.filter((planet) => (
    planet.name.includes(filterText)
  ));
  const tHead = list.length === 0
    ? []
    : Object.keys(list[0]);
  return (
    <div className="tableContainer">
      <table className="tableMain">
        <thead>
          <tr>
            {tHead.length === 0
              ? <th> loading... </th>
              : tHead.map((item) => (
                <th className="table" key={ item }>
                  { item }
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filter.length === 0
            ? <tr> loading... </tr>
            : filter.map((planet) => (
              <tr key={ planet.name }>
                <td>
                  { planet.name }
                </td>
                <td>
                  { planet.rotation_period }
                </td>
                <td>
                  { planet.orbital_period }
                </td>
                <td>
                  { planet.diameter }
                </td>
                <td>
                  { planet.climate }
                </td>
                <td>
                  { planet.gravity }
                </td>
                <td>
                  { planet.terrain }
                </td>
                <td>
                  { planet.surface_water }
                </td>
                <td>
                  { planet.population }
                </td>
                <td>
                  { planet.films }
                </td>
                <td>
                  { planet.created }
                </td>
                <td>
                  { planet.edited }
                </td>
                <td>
                  { planet.url }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
