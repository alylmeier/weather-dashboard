var APIkey = "fe226ea7cc2c3daa2d33569e66605787";

var citySearch = document.getElementById("city");

var ApiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=" +
  APIkey;

var cityEl = document.querySelector("#city");
var historyEl = document.getElementById("previous-buttons");
var weatherNow = JSON.parse(localStorage.getItem("data"));
var btnEl = document.querySelector("#enter");
var fiveDay = document.getElementById("five-day");
var currentWeatherEl = document.getElementById("current-weather");

function storeCities() {
  var hxCities = [];
  a = JSON.parse(localStorage.getItem("setCitiesArray")) || [];
  a.push(data);
  alert(citiesarray);
  localStorage.setItem("setCitiesArray", JSON.stringify(citiesarray));
}

// var hxCities = [];
// a.push(JSON.parse(localStorage.getItem("setCitiesArray")));

//this fetches from openweather
function getCurrent(e) {
  e.preventDefault();
  var city = cityEl.value;
  var url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    APIkey;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var city = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      };
      console.log(city);
      displayCurrent(city);
      getForecast(city);
      makeBtn(city);
      storeCities(city);
    });
}
//this displays the weather now
function displayCurrent(data) {
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=imperial&appid=${APIkey}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      currentWeatherEl.innerHTML = "";
      const nameEl = document.createElement("h2");
      nameEl.textContent = data.name;
      const tempEl = document.createElement("h4");
      tempEl.textContent = data.main.temp + " °F";
      const windEl = document.createElement("h4");
      windEl.textContent = "Wind Speed: " + data.wind.speed + " mph";
      const humidEl = document.createElement("h4");
      humidEl.textContent = data.weather[0].description;

      currentWeatherEl.appendChild(nameEl);
      currentWeatherEl.appendChild(tempEl);
      currentWeatherEl.appendChild(windEl);
      currentWeatherEl.appendChild(humidEl);
    });
}

//this makes the btn for the city entered

function makeBtn(data) {
  var cityBtn = document.createElement("button");
  cityBtn.setAttribute("id", "city-button");
  cityBtn.setAttribute("class", "btn btn-info");
  cityBtn.dataset.lat = data.lat;
  cityBtn.dataset.lon = data.lon;
  cityBtn.textContent = data.name;
  historyEl.appendChild(cityBtn);
}

//this isn't working, but you want it to click the button to search
function useBtn(e) {
  console.log(e);
  //GUARD STATEMENT
  if (!e.target.matches("button")) {
    return;
  }

  var hxCityEl = e.target;
  var city = {
    name: hxCityEl.textContent,
    lat: hxCityEl.dataset.lat,
    lon: hxCityEl.dataset.lon,
  };
  displayCurrent(city);
  getForecast(city);
}

//this does the second API call to get future data
function getForecast(data) {
  var APIURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}&units=imperial`;

  fetch(APIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayForecast(data);
    });
}

//this displays the "forecast"
function displayForecast(data) {
  console.log(data);
  fiveDay.innerHTML = "";

  //var dayCount = 6;
  for (var i = 3; i < data.list.length; i = i + 8) {
    const next5daysDate = document.createElement("h2");
    next5daysDate.setAttribute("class", "weatherblocks");
    next5daysDate.textContent = data.list[i].dt_txt;
    fiveDay.appendChild(next5daysDate);
    const next5days = document.createElement("p");
    next5days.textContent = data.list[i].main.temp + " °F";
    fiveDay.appendChild(next5days);
    const next5daysWind = document.createElement("p");
    next5daysWind.textContent =
      "Wind Speed: " + data.list[i].wind.speed + " mph";
    const next5daysHumid = document.createElement("p");
    next5daysHumid.textContent =
      "Humidity: " + data.list[i].main.humidity + "%";
    fiveDay.appendChild(next5daysWind);
    fiveDay.appendChild(next5daysHumid);
    //const next5daysIcon = document.createElement("h5");
    //let locationIcon = document.querySelector(".weather-icon");
    //const icon = data.list[i].weather[0].icon;
    //locationIcon.innerHTML = `<img src="icons/${icon}.png">;`;
    //next5daysIcon.textContent = data.list[i].weather[0].icon + "@2x.png";
    //fiveDay.appendChild(next5daysIcon);
  }
}

// sets any data in localStorage to the view
// saveTask();

document.querySelector("#enter").addEventListener("click", getCurrent);
document.querySelector("#previous-buttons").addEventListener("click", useBtn);

function init() {
  var allCities = localStorage.getItem(city);
}
init();
