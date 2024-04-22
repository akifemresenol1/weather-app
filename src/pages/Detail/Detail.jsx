import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import Error from "../Error/Error";
import "./Detail.css";

import axios from "axios";

import {
  WiThermometer,
  WiRaindrop,
  WiStrongWind,
  WiShowers,
  WiCloud,
} from "react-icons/wi";

import loadingAnimation from "../../assets/loading.json";

function ForecastDetail() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState([]);
  const { city } = useParams();
  const navigate = useNavigate();

  const options = { weekday: "short", month: "short", day: "numeric" };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiKey = "312a8c831dfba7c3342fbfe09be415d8";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const allForecasts = response.data.list;
        const countryCode = response.data.city.country;
        const fiveDayForecast = [];
        for (let i = 0; i < 40; i += 8) {
          fiveDayForecast.push(allForecasts[i]);
        }
        setForecast(fiveDayForecast);
        setCountryCode(countryCode);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        navigate("/error");
      }
    };

    fetchForecast();
  }, [city, navigate]);

  if (loading) {
    return (
      <div className="loading-animation">
        <Lottie className="loading-gif" animationData={loadingAnimation} />
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return <Error />;
  }

  return (
    <div className="section-detail">
      <div className="forecast-container">
        <button className="btn-backHome" onClick={() => navigate(-1)}>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 108.06"
            width={20}
            height={20}
          >
            <title>back-arrow</title>
            <path
              fill="#bfbfd4"
              d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z"
            />
          </svg>
        </button>
        <div className="section-today">
          {forecast.slice(0, 1).map((item, index) => (
            <div key={index}>
              <div className="top-today">
                <div className="today-wrapper">
                  <div className="today-title">
                    <h4>
                      {city.charAt(0).toUpperCase() + city.slice(1)},{" "}
                      {countryCode}
                    </h4>
                    <p>
                      {new Date(item.dt * 1000).toLocaleString(
                        "en-US",
                        options
                      )}
                    </p>
                  </div>
                  <div className="today-info">
                    <div>
                      <span> {item.main.temp}°c</span>
                      <p>
                        {item.weather[0].description.charAt(0).toUpperCase() +
                          item.weather[0].description.slice(1)}
                      </p>
                    </div>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="today-detail">
                <div className="forecast-detail">
                  <p>
                    <WiThermometer className="forecast-icon" /> Thermal
                    Sensation:
                  </p>
                  <span> {item.main.temp}°C</span>
                </div>
                <div className="forecast-detail">
                  <p>
                    <WiCloud className="forecast-icon" /> Cloud Cover:
                  </p>
                  <span>{item.clouds.all}%</span>
                </div>
                <div className="forecast-detail">
                  <p>
                    <WiShowers className="forecast-icon" /> Rain Probability:{" "}
                  </p>
                  <span>
                    {item.rain && item.rain["3h"]
                      ? `${((item.rain["3h"] / 3) * 100).toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="forecast-detail">
                  <p>
                    <WiRaindrop className="forecast-icon" /> Air Humidity:
                  </p>
                  <span> {item.main.humidity}%</span>
                </div>
                <div className="forecast-detail">
                  <p>
                    <WiStrongWind className="forecast-icon" /> Wind Speed:
                  </p>
                  <span> {item.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="forecast-item">
          {forecast.map((item, index) => (
            <div className="days-items" key={index}>
              <p className="day">
                {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                className="icon2"
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=""
              />
              <p className="temp">{item.main.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForecastDetail;
