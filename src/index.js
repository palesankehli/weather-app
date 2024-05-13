function giveWeather(response) {
  let updateTemperature = document.querySelector(".temperature-value");
  updateTemperature.innerHTML = Math.round(response.data.temperature.current);
  let updateHumidity = document.querySelector(".humidity-value");
  updateHumidity.innerHTML = response.data.temperature.humidity;
  let updateWind = document.querySelector(".wind-value");
  updateWind.innerHTML = response.data.wind.speed;
  let weatherCondition = document.querySelector(".condition");
  weatherCondition.innerHTML = response.data.condition.description;
  let updateTime = document.querySelector(".time");
  let updateDay = document.querySelector(".day");
  let date = new Date(response.data.time * 1000);
  updateTime.innerHTML = formatDate(date);
  let weatherIcon = document.querySelector(".weather-icon");

  weatherIcon.innerHTML = `<img src="  ${response.data.condition.icon_url}" class="weather-icon" />`;
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return day + " " + hours + ":" + minutes;

  if (minutes > 10) {
    minutes = "0" + minutes;
  }

  if (hours > 10) {
    hours = "0" + hours;
  }
}

function giveCityElement(city) {
  let apiKey = "a04o1a335def673e75084b5bt0de68b5";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey;
  axios.get(apiUrl).then(giveWeather);
}

function searchBegin(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-box");
  let cityELement = document.querySelector("p");
  let capitalizedValue =
    searchInputElement.value.charAt(0).toUpperCase() +
    searchInputElement.value.slice(1);
  cityELement.innerHTML = capitalizedValue;
  giveCityElement(capitalizedValue);
}

let searchCityElement = document.querySelector("#city-search");
searchCityElement.addEventListener("submit", searchBegin);

function displayForecast() {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecast.innerHTML =
      forecastHTML +
      `
  <div class="forecast-day">
    <div class="day">${day}</div>
     <div class="forecast-icon">☀</div>
    <div class="forecast-temperature">
      <span class="temperature-max">12</span>
      <span class="temp-unit-max">°C</span>
      <span class="temperature-min">10</span>
      <span class="temp-unit-min">°C</span>
    </div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
