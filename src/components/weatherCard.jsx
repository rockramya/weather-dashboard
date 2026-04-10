const WeatherCard = ({
  data,
  addFavorite,
  onViewDetails,
  unit,
  convertTemp,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        margin: "10px",
        borderRadius: "12px",
        width: "220px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        textAlign: "center",
        transition: "0.3s",
      }}
      onClick={() => onViewDetails(data.name)}
    >
      {/* City Name */}
      <h3 style={{ marginBottom: "5px" }}>{data.name}</h3>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      {/* Temperature */}
      <p style={{ fontSize: "22px", fontWeight: "bold", margin: "5px 0" }}>
        {convertTemp(data.main.temp).toFixed(1)}°{unit}
      </p>

      {/* Weather Condition */}
      <p style={{ marginBottom: "8px" }}>{data.weather[0].main}</p>

      {/* Extra Stats */}
      <p>💧 {data.main.humidity}%</p>
      <p>💨 {data.wind.speed} m/s</p>
      <p>🌡 Feels like: {convertTemp(data.main.feels_like).toFixed(1)}°{unit}</p>
      <p>ضغط Pressure: {data.main.pressure} hPa</p>

      {/* Favorite Button */}
      <button
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          addFavorite(data.name);
        }}
      >
        ⭐ Favorite
      </button>
    </div>
  );
};

export default WeatherCard;