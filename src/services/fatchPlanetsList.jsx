const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fatchPlanetsList = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export default fatchPlanetsList;
