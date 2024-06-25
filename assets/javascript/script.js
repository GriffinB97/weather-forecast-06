const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your API key from OpenWeatherMap

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
    }
});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data);
                saveSearchHistory(city);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    const cityName = document.getElementById('cityName');
    const date = document.getElementById('date');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('windSpeed');
    const humidity = document.getElementById('humidity');

    cityName.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
    temperature.textContent = data.main.temp;
    windSpeed.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
}

function saveSearchHistory(city) {
    const searchHistory = document.getElementById('searchHistory');
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => {
        getWeatherData(city);
    });
    searchHistory.appendChild(button);
}

// Add functionality to fetch and display the 5-day forecast
function getForecastData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                displayForecast(data);
            }
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';

        forecastCard.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}"></p>
            <p>Temp: ${forecast.main.temp} °F</p>
            <p>Wind: ${forecast.wind.speed} MPH</p>
            <p>Humidity: ${forecast.main.humidity} %</p>
        `;

        forecastContainer.appendChild(forecastCard);
    }
}

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data);
                getForecastData(city);
                saveSearchHistory(city);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
