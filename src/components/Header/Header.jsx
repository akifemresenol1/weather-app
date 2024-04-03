import "./Header.css";

function Header() {
  return (
    <header className="App-header">
      <h1 className="header-title">Weather App</h1>
      <h3>
        Welcome to <span>TypeWeather</span>
      </h3>
      <p>Choose a location to see the weather forecast</p>
    </header>
  );
}

export default Header;
