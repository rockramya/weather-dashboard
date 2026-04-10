import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ForecastChart = ({ data, convertTemp }) => {
  const chartData = data.slice(0, 8).map((item) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    temp: convertTemp(item.main.temp), // 🌡️ apply conversion
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📊 Hourly Temperature Trend</h3>

      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temp" />
      </LineChart>
    </div>
  );
};

export default ForecastChart;