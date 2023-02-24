function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  let headWeather = document.querySelector("#current-temp");
  let feelWeather = document.querySelector("#weather-feeling");
  let heading = document.querySelector("h1");
  let weatherHumidity = document.querySelector("#main-hum");
  let weatherWind = document.querySelector("#wind-speed");

  heading.innerHTML = cityName;
  headWeather.innerHTML = `${temperature}°C`;
  feelWeather.innerHTML = `Feels like ${feelsLike}°C`;
  weatherHumidity.innerHTML = `${humidity}%`;
  weatherWind.innerHTML = `${windSpeed}km/h`;
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  let units = "metric";
  let apiKey = "6a03f7bed78b1800fab711af26fd3f98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function changeToFahrenheit(event) {
  event.preventDefault();
  let celcius = document.querySelector("#current-temp");
  let fahrenheit = celsiusToFahrenheit(parseInt(celcius.textContent));
  console.log(fahrenheit);
  celcius.innerHTML = `${Math.round(fahrenheit)}°F`;
}
function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let celcius = fahrenheitToCelsius(parseInt(currentTemp.textContent));
  currentTemp.innerHTML = `${Math.round(celcius)}°C`;
}
function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "6a03f7bed78b1800fab711af26fd3f98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(myPosition);
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

//setting values
let today = new Date();
let month = months[today.getMonth()];
let day = days[today.getDay()];
let date = today.getDate();
let hour = today.getHours();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

//date and time settings
let weekDay = document.querySelector("#day h4");
let weekDate = document.querySelector("h5");
let time = document.querySelector("#time h4");

weekDay.innerHTML = day;
weekDate.innerHTML = `${date}/${month}`;
time.innerHTML = `${hour}:${minutes}`;

//event listeners
let searchForm = document.querySelector("#search-form");
let celciusButt = document.querySelector("#celsius");
let fahrenheitButt = document.querySelector("#fahrenheit");

searchForm.addEventListener("submit", searchCity);
celciusButt.addEventListener("click", changeToCelsius);
fahrenheitButt.addEventListener("click", changeToFahrenheit);

let myLocation = document.querySelector(".location-icon");
myLocation.addEventListener("click", currentLocation);
