import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../Style/Table.css';

function Table() {
  const { list } = useContext(PlanetsContext);

  const tHead = list.length === 0
    ? []
    : Object.keys(list[0]);

  return (
    <div className="tableContainer">
      <table className="tableMain">

        <thead>
          <tr>
            {tHead.length === 0
              ? <th className="tableCell"> loading... </th>
              : tHead.map((item) => (
                <th className="tableCell" key={ item }>
                  { item }
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {list.length === 0
            ? (
              <tr>
                <td> loading... </td>
              </tr>
            )
            : list.map((planet) => (
              <tr key={ planet.name }>
                <td className="tableCell">
                  { planet.name }
                </td>
                <td className="tableCell">
                  { planet.rotation_period }
                </td>
                <td className="tableCell">
                  { planet.orbital_period }
                </td>
                <td className="tableCell">
                  { planet.diameter }
                </td>
                <td className="tableCell">
                  { planet.climate }
                </td>
                <td className="tableCell">
                  { planet.gravity }
                </td>
                <td className="tableCell">
                  { planet.terrain }
                </td>
                <td className="tableCell">
                  { planet.surface_water }
                </td>
                <td className="tableCell">
                  { planet.population }
                </td>
                <td className="tableCell">
                  { planet.films }
                </td>
                <td className="tableCell">
                  { planet.created }
                </td>
                <td className="tableCell">
                  { planet.edited }
                </td>
                <td className="tableCell">
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
