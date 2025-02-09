// Your OpenWeatherMap API Key
const apiKey = '3d78d5e09fcebb31c3a8d7a3300a1c20';

// Fetch weather data for London
function fetchWeather() {
    const city = 'London';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log(data); // Log response data

            // Extract necessary weather details
            document.querySelector("#weather_city").textContent = data.name || 'N/A';
            document.querySelector("#weather_temperature").textContent = `${data.main.temp}°C` || 'N/A';
            document.querySelector("#weather_condition").textContent = data.weather[0].description || 'N/A';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector("#weather_city").textContent = 'Error';
        });
}
