const apiKey = "9d2af67fd1c7db9b6d14c6f9e4b91b99"; // OpenWeatherMap API key

const cityName = document.getElementById("cityName");
const cloud_pct = document.getElementById("cloud_pct");
const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const wind_speed = document.getElementById("wind_speed");
const wind_degrees = document.getElementById("wind_degrees");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const submitButton = document.getElementById("submit");

const handlePlaceSelection = (place) => {
  const cityInput = document.getElementById("city");
  cityInput.value = place;
  getWeather(place);
};

const hyderabadLink = document.getElementById("hyderabadLink");
const delhiLink = document.getElementById("delhiLink");
const bhimavaramLink = document.getElementById("bhimavaramLink");
const somethingElseLink = document.getElementById("somethingElseLink");

hyderabadLink.addEventListener("click", () =>
  handlePlaceSelection("Hyderabad")
);
delhiLink.addEventListener("click", () => handlePlaceSelection("Delhi"));
bhimavaramLink.addEventListener("click", () =>
  handlePlaceSelection("Bhimavaram")
);
somethingElseLink.addEventListener("click", () => {
  const cityInput = document.getElementById("city");
  cityInput.value = "";
  cityInput.focus();
});

const getWeather = (city) => {
  cityName.innerHTML = city;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      cloud_pct.innerHTML = response.clouds.all; // Adjusted for OpenWeatherMap
      temp.innerHTML = response.main.temp;
      feels_like.innerHTML = response.main.feels_like;
      humidity.innerHTML = response.main.humidity;
      min_temp.innerHTML = response.main.temp_min;
      max_temp.innerHTML = response.main.temp_max;
      wind_speed.innerHTML = response.wind.speed;
      wind_degrees.innerHTML = response.wind.deg;

      const sunriseTimestamp = response.sys.sunrise;
      const sunsetTimestamp = response.sys.sunset;
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      const options = { hour: "numeric", minute: "numeric", hour12: true };
      const sunriseTime = sunriseDate.toLocaleTimeString("en-US", options);
      const sunsetTime = sunsetDate.toLocaleTimeString("en-US", options);

      sunriseTimeElement.innerHTML = `<span id="sunriseTime">${sunriseTime}</span>`;
      sunsetTimeElement.innerHTML = `<span id="sunsetTime">${sunsetTime}</span>`;
    })
    .catch((err) => console.error(err));
};

const sunriseTimeElement = document.getElementById("sunriseTime");
const sunsetTimeElement = document.getElementById("sunsetTime");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const cityInput = document.getElementById("city");
  const city = cityInput.value;
  getWeather(city);
});

getWeather("Delhi");
