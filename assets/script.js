var APIkey = "fe226ea7cc2c3daa2d33569e66605787";

var citySearch = document.getElementById("city");

var ApiURL =
  "http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=" +
  APIkey;

var cityEl = document.querySelector("#city");
var currentEl = document.getElementById("current-weather");
var historyEl = document.getElementById("previous-buttons");
var weatherNow = JSON.parse(localStorage.getItem("data"));
var btnEl = document.querySelector("#enter");
var fiveDay = document.getElementById("five-day");
var currentWeatherEl = document.getElementById("current-weather");

function storeCities() {
  localStorage.setItem("city", city.value);
}

//this is one attempt to fetch from openweather
function getCurrent(e) {
  e.preventDefault();
  var city = cityEl.value;
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //display current weather
      displayCurrent(data);
      //get forecast
      getForecast(data);
      //create button
      makeBtn(data);
      storeCities();
    });
}
//this displays the weather now
function displayCurrent(data) {
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
}

//this makes the btn for the city entered
function makeBtn(data) {
  var cityBtn = document.createElement("button");
  cityBtn.textContent = data.name;
  historyEl.appendChild(cityBtn);
  cityBtn.addEventListener("click", getCurrent(data));
}

//this isn't working, but you want it to click the button to search
function useBtn(d) {
  cityBtn.addEventListener("click", useBtn());
  console.log("ive been clicked");
  var prevCity = document.getElementById("button");
  getCurrent(prevCity);
}

//function hxBtns() {
//localStorage.getItem(city);
//.then(makeBtn)
//}

//this does the second API call to get future data
function getForecast(data) {
  var lat = data.coord.lat;
  var long = data.coord.lon;
  var APIURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIkey}&units=imperial`;

  fetch(APIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayForecast(data);
    });
}

function displayForecast(data) {
  console.log(data);
  fiveDay.innerHTML = "";
  var dayCount = 6;
  for (var i = 1; i < dayCount; i++) {
    //this is also not working; you couldn't get the for loop to pull different increments
    //const next5daysDate = document.createElement("h3");
    //next5daysDate.textContent = data.list[i].dt_txt;
    //fiveDay.appendChild(next5daysDate);
    const next5days = document.createElement("h4");
    next5days.textContent = "Day " + i + ": " + data.list[i].main.temp + " °F";
    fiveDay.appendChild(next5days);
    const next5daysWind = document.createElement("h5");
    next5daysWind.textContent =
      "Wind Speed: " + data.list[i].wind.speed + " mph";
    const next5daysHumid = document.createElement("h5");
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

function init() {
  localStorage.getItem(city);
}
init(city);
