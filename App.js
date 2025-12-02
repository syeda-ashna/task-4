import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (city === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      if (!response.ok) {
        setError("City not found");
        setWeather(null);
        return;
      }

      const data = await response.json();
      setWeather({
        name: data.nearest_area[0].areaName[0].value,
        main: {
          temp: data.current_condition[0].temp_C,
          humidity: data.current_condition[0].humidity
        }
      });
      setError("");
    } catch (err) {
      setError("Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
