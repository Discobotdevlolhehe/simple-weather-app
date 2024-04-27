document.addEventListener('DOMContentLoaded', function () {
  const apiKey = "YOUR API"; // Replace with your OpenWeatherMap API key
  const searchBtn = document.getElementById('search-btn');
  const cityInput = document.getElementById('city-input');

  // Event listener for search button click
  searchBtn.addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput !== '') {
      fetchWeather(apiKey, cityInput);
    }
  });

  cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city !== '') {
        fetchWeather(apiKey, city);
      }
    }
  });

  function fetchWeather(apiKey, city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod && data.cod === '404') {
          displayError(data.message);
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
    <h2>Weather in ${city}</h2>
    <img src="${iconUrl}" alt="${weatherDescription}" class="weather-icon" style="width: 150px; height: 150px;">
    <p>Temperature: ${temperature}°C</p>
    <p>Feels like: ${feelsLike}°C</p>
    <p>Min temperature: ${minTemp}°C</p>
    <p>Max temperature: ${maxTemp}°C</p>
    <p>Pressure: ${pressure} hPa</p>
    <p>Humidity: ${humidity}%</p>
    <p>Visibility: ${visibility} meters</p>
    <p>Wind speed: ${windSpeed} m/s</p>
    <p>Wind direction: ${getWindDirection(windDirection)}</p>
    <p>Cloudiness: ${clouds}%</p>
    <p>Weather description: ${weatherDescription}</p>
    <p>Sunrise: ${sunrise}</p>
    <p>Sunset: ${sunset}</p>
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