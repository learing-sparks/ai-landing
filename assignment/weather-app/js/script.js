document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.querySelector('form');
    const weatherDisplay = document.querySelector('.weather-display');
    const apiKey = 'CC BY-SA 4.0'; // Replace with your actual API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    let preferredLocation = localStorage.getItem('preferredLocation') || 'New York';

    function fetchWeather(location) {
        fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                localStorage.setItem('preferredLocation', location);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const location = e.target.location.value;
        if (location) {
            fetchWeather(location);
            e.target.reset();
        }
    });

    fetchWeather(preferredLocation);
});