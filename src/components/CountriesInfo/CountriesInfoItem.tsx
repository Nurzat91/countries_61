import React from 'react';
import { CountryInfo } from '../../types';

interface Props {
  countryInfo: CountryInfo | null;
}

const CountriesInfoItem: React.FC<Props> = ({ countryInfo }) => {
  if (!countryInfo) {
    return <h3>Выберите страну.</h3>;
  }

  return (
    <div>
      <h2>{countryInfo.name}</h2>
      <p>Population: {countryInfo.population}</p>
    </div>
  );
};

export default CountriesInfoItem;