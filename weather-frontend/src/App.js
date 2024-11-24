import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const getDateRange = () => {
  const today = new Date();
  const firstDay = new Date(today); // Monday
  const lastDay = new Date(today); // Sunday
  lastDay.setDate(today.getDate() + 6);

  const formatDate = (date) =>
    `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;

  return `${formatDate(firstDay)} - ${lastDay.getDate()} ${firstDay.getFullYear()}`;
};

const App = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch countries with flags and codes
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesWithCode = response.data.map((country) => ({
          code: country.cca2, // 2-letter country code
          flag: country.flags.png, // Country flag image URL
        }));
        setCountries(countriesWithCode);

        if (countriesWithCode.length > 0) {
          setCountry(countriesWithCode[0].code); // Pre-select the first country
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setForecast(null);

    if (!city || !country) {
      setError("Please enter both city and country code");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/forecast", {
        params: { city, country },
      });
      setForecast(response.data);
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = countries.filter((countryData) =>
    countryData.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app ${forecast ? "after-search" : "before-search"}`}>
      <div className="search-container">
        <div className="icon">
          <span alt="Weather Icon Placeholder">🌤️</span>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="dropdown-container">
            <div
              className="country-select"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>
                <img
                  src={`https://flagsapi.com/${country}/flat/64.png`}
                  alt={`Flag of ${country}`}
                  style={{ width: 20, marginRight: 10 }}
                />
                <span className="dropdown-country-code">{country}</span>
              </span>
              <i className={`arrow ${isOpen ? "open" : ""}`}></i>
            </div>

            {isOpen && (
              <div className="dropdown-menu">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search country code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dropdown-search"
                />
                {/* Country Options */}
                {filteredCountries.map((countryData) => (
                  <div
                    key={countryData.code}
                    className="dropdown-item"
                    onClick={() => {
                      setCountry(countryData.code);
                      setIsOpen(false);
                      setSearchTerm(""); // Clear search after selection
                    }}
                  >
                    <img
                      src={countryData.flag}
                      alt={`Flag of ${countryData.code}`}
                      style={{ width: 20, marginRight: 10 }}
                    />
                    {countryData.code}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Please enter your location..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
            />
            <button type="submit" className="search-button">
              <img src="/search.png" alt="Search" />
            </button>
          </div>
        </form>
      </div>

      {forecast && (
        <div className="result-container">
          <p className="date-range">{getDateRange()}</p>
          <h2 className="temperature">{forecast.avg_temp}°C</h2>
          <div className="forecast">
            {forecast.weekly_forecast.map((day, index) => (
              <div className="day" key={index}>
                <span className="day-name">{day.day.toUpperCase()}</span>
                <br />
                <span className="day-temp">{day.temp}°C</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;