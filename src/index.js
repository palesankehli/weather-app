function searchBegin(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-box");
  let cityELement = document.querySelector("h1");
  let capitalizedValue =
    searchInputElement.value.charAt(0).toUpperCase() +
    searchInputElement.value.slice(1);
  cityELement.innerHTML = capitalizedValue;
}

let searchCityElement = document.querySelector("#city-search");
searchCityElement.addEventListener("submit", searchBegin);
