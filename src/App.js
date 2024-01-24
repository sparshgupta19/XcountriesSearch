import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCountriesData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      setData(countries);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  const filteredCountries = data.filter((item) =>
    item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="containerStyle">
        {filteredCountries.map((item) => (
          <div className="countryCard" key={item.cca3}>
            <img
              src={item.flags.png}
              alt="country-flag"
              width={100}
              height={100}
            />
            <h2>{item.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
