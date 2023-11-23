import React, { useState, useEffect } from 'react';
import { CountryInfo } from '../../types';


const CountriesInfoItem: React.FC<{ countryInfo: CountryInfo | null }> = ({ countryInfo }) => {
  const [borderCountriesNames, setBorderCountriesNames] = useState<string[]>([]);

  const fetchCountryCode = async (alpha3Code: string) => {
    try {
      const response = await fetch(`https://restcountries.com/v2/alpha/${alpha3Code}`);
      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }
      const countryData = await response.json();
      return countryData.name;
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (countryInfo?.borders) {
        const borderCountries  = countryInfo.borders || [];
        const names: string [] = await Promise.all(
          borderCountries.map(async (border: string) => {
            return await fetchCountryCode(border);
          })
        );
        setBorderCountriesNames(names);
      }
    };

    void fetchBorderCountries();
  }, [countryInfo]);

  return (
    <div>
      {countryInfo ? (
        <div className="d-flex">
          <div>
            <h2>{countryInfo.name}</h2>
            <p><strong>Capital:</strong> {countryInfo.capital}</p>
            <p><strong>Native Name:</strong> {countryInfo.nativeName}</p>
            <p><strong>Region:</strong> {countryInfo.region}</p>
            <p><strong>Population:</strong> {countryInfo.population}</p>
            <p><strong>Borders with:</strong></p>
            <ul>
              {borderCountriesNames.map((name, index) => (
                <li style={{listStyle: "none"}} key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="ms-3"><img style={{ width: '200px' }} src={countryInfo.flag} alt={`${countryInfo.name} flag`} /></div>
        </div>
      ) : (
        <h3>Выберите страну.</h3>
      )}
    </div>
  );
};

export default CountriesInfoItem;
