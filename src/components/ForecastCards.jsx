const ForecastCards = ({ data, unit, convertTemp }) => {
  // pick one data per day (every 8th entry = 24 hrs)
  const dailyData = data.filter((_, index) => index % 8 === 0);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📅 5-Day Forecast</h3>

      {/* 🌤️ Daily Forecast */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {dailyData.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "10px",
              width: "130px",
              textAlign: "center",
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Day */}
            <p style={{ fontWeight: "bold" }}>
              {new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            {/* Temperature */}
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              {convertTemp(item.main.temp).toFixed(1)}°{unit}
            </p>

            {/* Condition */}
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>

      {/* ⏰ Hourly Forecast */}
      <h3 style={{ marginTop: "25px" }}>⏰ Hourly Forecast</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {data.slice(0, 8).map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: "90px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              background: "#ffffff",
            }}
          >
            {/* Time */}
            <p style={{ fontSize: "12px" }}>
              {item.dt_txt.split(" ")[1].slice(0, 5)}
            </p>

            {/* Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="icon"
            />

            {/* Temp */}
            <p style={{ fontWeight: "bold" }}>
              {convertTemp(item.main.temp).toFixed(1)}°{unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;