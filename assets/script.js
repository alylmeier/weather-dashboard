var APIkey = "fe226ea7cc2c3daa2d33569e66605787";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
var cityEl = document.querySelector("#city")
var historyEl = document.querySelector('#previous-buttons')
var currentEl = document.querySelector('#current-weather')
var sevenDay = document.querySelector('#seven-day')

//if you are going to use lat&lon, use these variable
//let latLon = function (pos) {
//let lat = pos.coords.latitude;
//let lon = pos.coords.longitude;
//getForecast(city);
//}

//this interprets the city entered by the user
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityInput = cityEl.value.trim();
  
    if (cityInput) {
      getCurrent(cityInput);
  
      currentEl.textContent = '';
      cityEl.value = '';
    } else {
      alert('Please enter the city you want to see the weather for');
    }
  };

function makeBtn() {
    console.log("button here")
    var earlierCity = document.createElement('button')
    button.setAttribute.cityInput


}
 

//this would be what handles the buttons generated by previous inputs
  var buttonClickHandler = function (event) {
    var previous = event.target.getAttribute('data-language');
  
    // If there is no language read from the button, don't attempt to fetch repos
    if (language) {
      getFeaturedRepos(language);
  
      repoContainerEl.textContent = '';
    }
  };

//this is one attempt to fetch from openweather
function getCurrent() {
    //fetch('https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&appid='+apiKey)
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
   //make container for current
    let currentDiv=document.createElement("div")
    currentDiv.setAttribute("id","display")
    currentDiv.innerHTML=response
    //youre not sure, but you think you have to parse thejson response 
}

function getForecast() {

    let forecastDiv=document.createElement("div")
   forecastDiv.setAttribute()
   fnDiv.innerHTML=question.question
} 
    
    
//you want to add this but don't know how
//.catch(function (error) {
//  alert('Unable to connect to Open Weather');
//});

var getOlderWeather 

var formSubmitHandler = function (event) {
    event.preventDefault();

    var currentCity = city.value.trim();
    
    if (currentCity) {
        getWeather(currentCity);

        currentEl.textContent = '';


    }
}


//function saveTask() {
   //     localStorage.setItem("city", JSON.stringify(data));
  //  }
    
    // sets any data in localStorage to the view
   // saveTask();

//btnEl.addEventListener('click', function(){
    console.log(city)
    getCurrent();
    //makeBtn;
//})





//make container for history w buttons
let historyDiv=document.createElement("div")
   questionDiv.setAttribute("id","qtext")
   questionDiv.innerHTML=question.question



