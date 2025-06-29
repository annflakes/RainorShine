
const params = new URLSearchParams(window.location.search);
const city = params.get("city");
const output = document.getElementById("output");

if (city) {
  output.textContent = `Let's see the weather in ${decodeURIComponent(city)}`;

  const apiKey = "2859fedcd83302dadc1938b8a6c6bd14"; 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      
      if (data.main && data.weather && data.wind && data.visibility !== undefined) {
        document.getElementById("feelslike").textContent = `Feels like: ${data.main.feels_like}°C`;
        document.getElementById("windspeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("visibility").textContent = `Visibility: ${data.visibility / 1000} km`;
        document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById("condition").textContent = `Weather Condition: ${data.weather[0].description}`;
        const condition = data.weather[0].main.toLowerCase(); // e.g., "clear", "clouds", "rain", etc.
        const body = document.getElementById("weatherBody"); // Make sure your <body> has id="weatherBody"

        switch (condition) {
          case "clear":
             body.style.backgroundImage = "url('images/clear.jpg')";
             break;
          case "clouds":
             body.style.backgroundImage = "url('images/clouds.jpg')";
             break;
          case "rain":
             body.style.backgroundImage = "url('images/rain.jpg')";
             break;
          case "snow":
             body.style.backgroundImage = "url('images/snow.jpg')";
             break;
          case "thunderstorm":
             body.style.backgroundImage = "url('images/thunder.jpg')";
             break;
          default:
             body.style.backgroundColor = "#333"; 
        }

        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
      } else {
        output.textContent = "Incomplete data received from API.";
        console.error("Unexpected API response structure:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      output.textContent = "Couldn't fetch weather data.";
    });

} else {
  output.textContent = "No city selected.";
}
