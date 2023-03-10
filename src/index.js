//functions
function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}
function showForecast(response) {
  let dailyForecast = response.data.daily;
  let myForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row"> `;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4 new-day">
        <div>${formatDays(forecastDay.dt)}</div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" class="following-icons"/>
        <div>${Math.round(
          forecastDay.temp.max
        )}° <span class="min-temperature">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
      </div> 
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  myForecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}
function showTemperature(response) {
  let headWeather = document.querySelector("#current-temp");
  let feelWeather = document.querySelector("#weather-feeling em");
  let currentDescripton = document.querySelector("#description em");
  let heading = document.querySelector("h1");
  let weatherHumidity = document.querySelector("#main-hum");
  let weatherWind = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  heading.innerHTML = response.data.name;
  headWeather.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  feelWeather.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  currentDescripton.innerHTML = response.data.weather[0].main;
  weatherHumidity.innerHTML = `${response.data.main.humidity}%`;
  weatherWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let iconId = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}
function callCity(city) {
  let units = "metric";
  let apiKey = "6a03f7bed78b1800fab711af26fd3f98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  callCity(cityInput.value);
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

//global variables
let celsiusTemperature = "";
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

//setting date and time values
let today = new Date();
let weekDay = document.querySelector("#day h4");
let weekDate = document.querySelector("#exact-date h4");
let time = document.querySelector("#time h4");
let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

weekDay.innerHTML = days[today.getDay()];
weekDate.innerHTML = `${today.getDate()}/${months[today.getMonth()]}`;
time.innerHTML = `${hour}:${minutes}`;

//event listeners
let searchForm = document.querySelector("#search-form");
let myLocation = document.querySelector(".location-icon");

searchForm.addEventListener("submit", searchCity);
myLocation.addEventListener("click", currentLocation);

//onload calls
callCity("Dubai");
