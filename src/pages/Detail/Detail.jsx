import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react"; // Lottie kütüphanesini import edin

import "./Detail.css";

import axios from "axios";

import {
  WiThermometer,
  WiRaindrop,
  WiStrongWind,
  WiShowers,
  WiCloud,
} from "react-icons/wi";

// Animasyonu import edin
import loadingAnimation from "../../assets/loading.json";

function ForecastDetail() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true); // Yüklenme durumunu takip edin
  const { city } = useParams();
  const options = { weekday: "short", month: "short", day: "numeric" };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = "312a8c831dfba7c3342fbfe09be415d8";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const allForecasts = response.data.list;
        const fiveDayForecast = [];
        for (let i = 0; i < 40; i += 8) {
          fiveDayForecast.push(allForecasts[i]);
        }
        setForecast(fiveDayForecast);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) {
    return (
      <div className="loading-animation">
        <Lottie className="loading-gif" animationData={loadingAnimation} />
      </div>
    );
  }

  if (forecast.length === 0) {
    return <div>No forecast data available.</div>;
  }

  return (
    <div className="section-detail">
      <h2 className="title">iWeather {city}</h2>
      <div className="forecast-container">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleString("en-US", options)}</p>
            <p>
              <WiThermometer /> Thermal Sensation:{" "}
              <span> {item.main.temp}°C</span>
            </p>
            <p>
              <WiCloud /> Cloud Cover: <span>{item.clouds.all}%</span>
            </p>
            <p>
              <WiShowers /> Rain Probability:{" "}
              <span>
                {item.rain && item.rain["3h"]
                  ? `${((item.rain["3h"] / 3) * 100).toFixed(1)}%`
                  : "0%"}
              </span>
            </p>
            <p>
              <WiRaindrop /> Air Humidity: <span> {item.main.humidity}%</span>
            </p>
            <p>
              <WiStrongWind /> Wind Speed: <span> {item.wind.speed} m/s</span>
            </p>
            <p>Condition: {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDetail;
