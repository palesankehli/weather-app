function searchBegin(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-box");
  let cityELement = document.querySelector("h1");
  let capitalizedValue =
    searchInputElement.value.charAt(0).toUpperCase() +
    searchInputElement.value.slice(1);
  cityELement.innerHTML = capitalizedValue;
}

let apiKey = "a04o1a335def673e75084b5bt0de68b5";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key={apiKey}";

let searchCityElement = document.querySelector("#city-search");
searchCityElement.addEventListener("submit", searchBegin);
