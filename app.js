document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
  const cityInput = document.getElementById("city");
  const getWeatherButton = document.getElementById("get-weather");
  const weatherDiv = document.querySelector(".weather");
  const errorDiv = document.getElementById("error-message");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const icon = document.getElementById("icon");

  getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((data) => {
          errorDiv.style.display = "none";
          weatherDiv.style.display = "block";
          cityName.textContent = data.name;
          temperature.textContent = `Temperature: ${data.main.temp}°C`;
          description.textContent = `Weather: ${data.weather[0].description}`;
          icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch((error) => {
          weatherDiv.style.display = "none";
          errorDiv.style.display = "block";
          errorDiv.textContent = error.message;
        });
    }
  });
});
