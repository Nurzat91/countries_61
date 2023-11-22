import GetListName from './GetListName';
import {useState, useEffect} from 'react';
import {NameListProps} from '../../types';

const GetListForm = () => {
  const [countries, setCountries] = useState<NameListProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=name');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: NameListProps[] = await response.json();
        console.log(data);
        setCountries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    void fetchData();
  }, []);
  return (
    <div>
      {countries.map((country) => (
        <div key={country.id}>
          <GetListName name={country.name}/>
        </div>
      ))}
    </div>
  );
};

export default GetListForm;