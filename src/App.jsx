import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchForecast } from "./redux/weatherSlice";
import { useState, useEffect } from "react";
import WeatherCard from "./components/weatherCard";
import ForecastChart from "./components/ForecastChart";
import ForecastCards from "./components/ForecastCards";

function App() {
  const dispatch = useDispatch();
  const { cities, forecasts, loading, error } = useSelector(
    (state) => state.weather
  );

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [unit, setUnit] = useState("C");

  // 🌡️ Temperature converter
  const convertTemp = (temp) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
      setCity("");
    }
  };

  const addFavorite = (city) => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favs.includes(city)) {
      favs.push(city);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  };

  const handleViewDetails = (cityName) => {
    setSelectedCity(cityName);
    dispatch(fetchForecast(cityName));
  };

  // ⭐ Load favorites on start
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    favs.forEach((city) => {
      dispatch(fetchWeather(city));
    });
  }, [dispatch]);

  // 🔁 Auto refresh every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      cities.forEach((c) => dispatch(fetchWeather(c.name)));
    }, 60000);

    return () => clearInterval(interval);
  }, [cities, dispatch]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* Header */}
      <h1 style={{ marginBottom: "10px" }}>Weather Dashboard 🌤️</h1>

      {/* Search + Toggle */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: "6px", marginRight: "10px" }}
        />

        <button onClick={handleSearch} style={{ marginRight: "10px" }}>
          Search
        </button>

        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Weather Cards */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cities.map((c, index) => (
          <WeatherCard
            key={index}
            data={c}
            addFavorite={addFavorite}
            onViewDetails={handleViewDetails}
            unit={unit}
            convertTemp={convertTemp}
          />
        ))}
      </div>

      {/* Detailed View */}
      {selectedCity && forecasts[selectedCity] && (
        <div style={{ marginTop: "30px" }}>
          <h2>{selectedCity} - Detailed Forecast</h2>

          <ForecastChart
            data={forecasts[selectedCity]}
            convertTemp={convertTemp}
          />

          <ForecastCards
            data={forecasts[selectedCity]}
            unit={unit}
            convertTemp={convertTemp}
          />
        </div>
      )}
    </div>
  );
}

export default App;