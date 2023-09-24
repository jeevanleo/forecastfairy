const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b45e96323fmshf5e4bc50d3b8a90p1e091djsnfb21cde4eb87',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
	},
};

const cityName = document.getElementById('cityName'); // Add this line to get the city name element
const cloud_pct = document.getElementById('cloud_pct'); // Add these lines to get other elements
const temp = document.getElementById('temp');
const feels_like = document.getElementById('feels_like');
const humidity = document.getElementById('humidity');
const min_temp = document.getElementById('min_temp');
const max_temp = document.getElementById('max_temp');
const wind_speed = document.getElementById('wind_speed');
const wind_degrees = document.getElementById('wind_degrees');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const submitButton = document.getElementById('submit'); // Change to 'submit' to match your HTML

// Add a function to handle place selection from the dropdown
const handlePlaceSelection = (place) => {
	const cityInput = document.getElementById('city');
	cityInput.value = place;
	getWeather(place);
  };
  
  // Add event listeners to the "Places" dropdown items
  const hyderabadLink = document.getElementById('hyderabadLink');
  const delhiLink = document.getElementById('delhiLink');
  const bhimavaramLink = document.getElementById('bhimavaramLink');
  const somethingElseLink = document.getElementById('somethingElseLink');
  
  hyderabadLink.addEventListener('click', () => handlePlaceSelection('Hyderabad'));
  delhiLink.addEventListener('click', () => handlePlaceSelection('Delhi'));
  bhimavaramLink.addEventListener('click', () => handlePlaceSelection('Bhimavaram'));
  somethingElseLink.addEventListener('click', () => {
	const cityInput = document.getElementById('city');
	cityInput.value = '';
	cityInput.focus();
  });
  
  // ... (other code remains the same)
  

const getWeather = (city) => {
	cityName.innerHTML = city;
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			cloud_pct.innerHTML = response.cloud_pct;
			temp.innerHTML = response.temp;
			feels_like.innerHTML = response.feels_like;
			humidity.innerHTML = response.humidity;
			min_temp.innerHTML = response.min_temp;
			max_temp.innerHTML = response.max_temp;
			wind_speed.innerHTML = response.wind_speed;
			wind_degrees.innerHTML = response.wind_degrees;

			const sunriseTimestamp = response.sunrise;
			const sunsetTimestamp = response.sunset;
			const sunriseDate = new Date(sunriseTimestamp * 1000);
			const sunsetDate = new Date(sunsetTimestamp * 1000);
	  
			const options = { hour: 'numeric', minute: 'numeric', hour12: true };
			const sunriseTime = sunriseDate.toLocaleTimeString('en-US', options);
			const sunsetTime = sunsetDate.toLocaleTimeString('en-US', options);
	  
			// Update the HTML elements with the converted times
			sunriseTimeElement.innerHTML = `Sunrise time is <span id="sunriseTime">${sunriseTime}</span>`;
			sunsetTimeElement.innerHTML = `Sunset time is <span id="sunsetTime">${sunsetTime}</span>`;
		})
		.catch((err) => console.error(err));
};
const sunriseTimeElement = document.getElementById('sunriseTime');
const sunsetTimeElement = document.getElementById('sunsetTime');

submitButton.addEventListener('click', (e) => {
	e.preventDefault();
	const cityInput = document.getElementById('city'); // Add this line to get the city input element
	const city = cityInput.value;
	getWeather(city);
});

getWeather('Delhi');


