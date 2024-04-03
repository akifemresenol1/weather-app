import { useState } from "react";
import { Link } from "react-router-dom";

import "./SearchForm.css";

function SearchForm() {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      document.getElementById("link").click();
    }
  };

  return (
    <div className="container-searchForm">
      <input
        type="text"
        placeholder="Enter city/town..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
      <Link id="link" to={`/forecast/${city}`}>
        Get Forecast
      </Link>
    </div>
  );
}

export default SearchForm;
