import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return res.data;
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return {
      city,
      data: res.data.list,
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    forecasts: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const exists = state.cities.find(
          (c) => c.name === action.payload.name
        );
        if (!exists) {
          state.cities.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecasts[action.payload.city] = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;