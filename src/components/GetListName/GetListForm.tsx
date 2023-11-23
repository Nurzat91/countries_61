import { useState, useEffect } from 'react';
import { NameListProps, CountryInfo } from '../../types';
import GetListName from './GetListName';
import CountriesInfoItem from '../CountriesInfo/CountriesInfoItem';

const GetListForm = () => {
  const [countries, setCountries] = useState<NameListProps[]>([]);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=name');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: NameListProps[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    void fetchData();
  }, []);

  const clickNameCountry = async (name: string) => {
    try {
      const response = await fetch(`https://restcountries.com/v2/name/${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }
      const [countryInfo]: CountryInfo[] = await response.json();
      setSelectedCountryInfo(countryInfo);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex my-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
      <div className="col-4 ms-3 overflow-y-auto" style={{maxHeight: "600px", fontSize: "18px", cursor: "pointer"}}>
        {countries.map((country, index) => (
          <div key={index}>
            <GetListName
              key={country.id}
              name={country.name}
              onClick={() => {
                setSelectedCountryInfo(null);
                clickNameCountry(country.name);
              }}
            />
          </div>
        ))}
      </div>
      <div className="col-8 ps-3">
        <CountriesInfoItem countryInfo={selectedCountryInfo} />
      </div>
    </div>
  );
};

export default GetListForm;