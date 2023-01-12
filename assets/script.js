var APIkey = "fe226ea7cc2c3daa2d33569e66605787";

var citySearch = document.getElementById("city");

var ApiURL =
  "http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=" +
  APIkey;

var cityEl = document.querySelector("#city");
var currentEl = document.getElementById("current-weather");
var historyEl = document.querySelector("#previous-buttons");
var weatherNow = JSON.parse(localStorage.getItem("data"));
var btnEl = document.querySelector("#enter");
var fiveDay = document.querySelector("#five-day");
var currentWeatherEl = document.getElementById("current-weather");

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
      console.log(data);
      //console.log(data.weather[0].main)
      //document.getElementById('current-weather').innerHTML = data.weather[0].main;
      //display current weather
      displayCurrent(data);
      //get forecast
      getForecast(data);
      //save data
      //create button
    });
}

function displayCurrent(data) {
  console.log(data);
  currentWeatherEl.innerHTML = "";
  const nameEl = document.createElement("h2");
  nameEl.textContent = data.name;
  const tempEl = document.createElement("h5");
  tempEl.textContent = data.main.temp;

  currentWeatherEl.appendChild(nameEl);
  currentWeatherEl.appendChild(tempEl);
  //document.getElementById('current-weather').innerHTML = data.weather[0].main;
}

function getForecast(data) {
  var lat = data.coord.lat;
  var long = data.coord.lon;
  var APIURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIkey}&units=imperial`;

  fetch(APIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function makeBtn() {
  console.log("button here");
  var earlierCity = document.createElement("button");
  button.setInnerHTML;
}

//this would be what handles the buttons generated by previous inputs
var buttonClickHandler = function (event) {
  // var previous = event.target.getAttribute('data-language');

  // If there is no language read from the button, don't attempt to fetch repos
  if (language) {
    getFeaturedRepos(language);

    current.textContent = "";
  }
};

var getOlderWeather;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var currentCity = city.value.trim();

  if (currentCity) {
    getWeather(currentCity);

    //currentEl.textContent = '';
  }
};

//function saveTask() {
//     localStorage.setItem("city", JSON.stringify(data));
//  }

// sets any data in localStorage to the view
// saveTask();

document.querySelector("#enter").addEventListener("click", getCurrent);
