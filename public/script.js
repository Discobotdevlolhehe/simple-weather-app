document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('search-btn');
  const cityInput = document.getElementById('city-input');

  searchBtn.addEventListener('click', function () {
      const city = cityInput.value.trim();
      if (city !== '') {
          fetchWeather(city);
      }
  });

  cityInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          const city = cityInput.value.trim();
          if (city !== '') {
              fetchWeather(city);
          }
      }
  });

  function fetchWeather(city) {
      fetch(`/weather?city=${city}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  displayError(data.error.message);
              } else {
                  displayWeather(data);
              }
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
              displayError('Failed to fetch weather data. Please try again later.');
          });
  }


  function displayWeather(weatherData) {
  const weatherInfo = document.getElementById('weather-info');
  const city = weatherData.name;
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const minTemp = weatherData.main.temp_min;
  const maxTemp = weatherData.main.temp_max;
  const pressure = weatherData.main.pressure;
  const humidity = weatherData.main.humidity;
  const visibility = weatherData.visibility;
  const windSpeed = weatherData.wind.speed;
  const windDirection = weatherData.wind.deg;
  const clouds = weatherData.clouds.all;
  const weatherDescription = weatherData.weather[0].description;
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  
  
  
  // Display weather information
weatherInfo.innerHTML = `
  <div class="weather-container">
    <h2>Weather in ${city}</h2>
    <div class="weather-details">
      <div class="weather-icon-container">
        <img src="${iconUrl}" alt="${weatherDescription}" class="weather-icon">
      </div>
      <div class="weather-data">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Feels like:</strong> ${feelsLike}°C</p>
        <p><strong>Min temperature:</strong> ${minTemp}°C</p>
        <p><strong>Max temperature:</strong> ${maxTemp}°C</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Visibility:</strong> ${visibility} meters</p>
        <p><strong>Wind speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Wind direction:</strong> ${getWindDirection(windDirection)}</p>
        <p><strong>Cloudiness:</strong> ${clouds}%</p>
        <p><strong>Weather description:</strong> ${weatherDescription}</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
      </div>
    </div>
  </div>
`;
}

  function displayError(message) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `<p>Error: ${message}</p>`;
  }


  function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  }
});