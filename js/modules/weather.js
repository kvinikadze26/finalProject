import { getElement, setHTML, addEvent } from "../utils/dom.js";

export function initWeather() {
  const weatherGrid = getElement("weather-grid");
  const weatherLoading = getElement("weather-loading");

  if (!weatherGrid || !weatherLoading) return;

  const cities = [
    { name: "Tbilisi", country: "Georgia", lat: 41.7151, lon: 44.8271 },
    { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { name: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  ];

  const BASE_URL = "https://api.open-meteo.com/v1/forecast";

  async function fetchWeatherData(city) {
    try {
      const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&timezone=auto`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching weather for ${city.name}:`, error);
      return null;
    }
  }

  function getWeatherIcon(weatherCode) {
    const iconMap = {
      0: "☀️",
      1: "🌤️",
      2: "🌤️",
      3: "🌤️",
      45: "☁️",
      48: "☁️",
      51: "🌫️",
      53: "🌫️",
      55: "🌫️",
      56: "🌦️",
      57: "🌦️",
      61: "🌧️",
      63: "🌧️",
      65: "🌧️",
      66: "🌨️",
      67: "🌨️",
      71: "🌨️",
      73: "🌨️",
      75: "🌨️",
      77: "🌨️",
      80: "🌦️",
      81: "🌦️",
      82: "🌦️",
      85: "🌨️",
      86: "🌨️",
      95: "⛈️",
      96: "⛈️",
      99: "⛈️",
    };

    return iconMap[weatherCode] || "🌡️";
  }

  function getWeatherDescription(weatherCode) {
    const descriptionMap = {
      0: "Clear sky",
      1: "Partly cloudy",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return descriptionMap[weatherCode] || "Unknown";
  }

  function createWeatherCard(weatherData, city) {
    const current = weatherData.current;

    return `
      <div class="weather-card">
        <div class="weather-city">${city.name}</div>
        <div class="weather-country">${city.country}</div>
        <div class="weather-icon">${getWeatherIcon(current.weather_code)}</div>
        <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
        <div class="weather-description">${getWeatherDescription(
          current.weather_code
        )}</div>
        <div class="weather-details">
          <div class="weather-detail">
            <div class="weather-detail-label">Feels like</div>
            <div class="weather-detail-value">${Math.round(
              current.apparent_temperature
            )}°C</div>
          </div>
          <div class="weather-detail">
            <div class="weather-detail-label">Humidity</div>
            <div class="weather-detail-value">${
              current.relative_humidity_2m
            }%</div>
          </div>
          <div class="weather-detail">
            <div class="weather-detail-label">Wind</div>
            <div class="weather-detail-value">${Math.round(
              current.wind_speed_10m
            )} km/h</div>
          </div>
          <div class="weather-detail">
            <div class="weather-detail-label">Pressure</div>
            <div class="weather-detail-value">${Math.round(
              current.pressure_msl
            )} hPa</div>
          </div>
        </div>
      </div>
    `;
  }

  function createErrorCard(city, error) {
    return `
      <div class="weather-card weather-error">
        <div class="weather-city">${city.name}</div>
        <div class="weather-country">${city.country}</div>
        <p>Unable to load weather data</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
  }

  async function loadAllWeather() {
    try {
      weatherLoading.style.display = "block";
      setHTML(weatherGrid, "");

      const weatherPromises = cities.map(async (city) => {
        const weatherData = await fetchWeatherData(city);
        return { city, weatherData };
      });

      const results = await Promise.allSettled(weatherPromises);

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { city, weatherData } = result.value;
          if (weatherData) {
            weatherGrid.innerHTML += createWeatherCard(weatherData, city);
          } else {
            weatherGrid.innerHTML += createErrorCard(
              city,
              "Failed to fetch data"
            );
          }
        } else {
          const city = cities[Math.floor(Math.random() * cities.length)];
          weatherGrid.innerHTML += createErrorCard(city, "Request failed");
        }
      });
    } catch (error) {
      console.error("Error loading weather data:", error);
      setHTML(
        weatherGrid,
        `
          <div class="weather-error">
            <p>Failed to load weather data. Please try again later.</p>
            <button onclick="location.reload()">Retry</button>
          </div>
        `
      );
    } finally {
      weatherLoading.style.display = "none";
    }
  }

  loadAllWeather();

  setInterval(loadAllWeather, 30 * 60 * 1000);
}
