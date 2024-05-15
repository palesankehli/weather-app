function giveWeather(response) {
  let updateTemperature = document.querySelector(".temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("p");

  let weatherCondition = document.querySelector(".condition");
  let updateHumidity = document.querySelector(".humidity-value");
  let updateWind = document.querySelector(".wind-value");
  let updateTime = document.querySelector(".time");
  let updateDay = document.querySelector(".day");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector(".weather-icon");

  cityElement.innerHTML = response.data.city;
  updateTime.innerHTML = formatDate(date);
  weatherCondition.innerHTML = response.data.condition.description;
  updateHumidity.innerHTML = response.data.temperature.humidity;
  updateWind.innerHTML = response.data.wind.speed;
  updateTemperature.innerHTML = Math.round(temperature);
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function giveCityElement(city) {
  let apiKey = "a04o1a335def673e75084b5bt0de68b5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(giveWeather);
}

function searchBegin(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-box");
  let cityElement = document.querySelector("p");
  let capitalizedValue =
    searchInputElement.value.charAt(0).toUpperCase() +
    searchInputElement.value.slice(1);
  cityElement.innerHTML = capitalizedValue;
  giveCityElement(capitalizedValue);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "a04o1a335def673e75084b5bt0de68b5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchCityElement = document.querySelector("#city-search");
searchCityElement.addEventListener("submit", searchBegin);
