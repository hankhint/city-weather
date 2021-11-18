var displayWeather = function (city, data) {
  console.log(data.weather[0]);
  var iconCode = data.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
  // console.log(iconURL)
  var cityName = document.getElementById("cityName");
  var cityTemp = document.getElementById("cityTemp");
  var userInputCityName = document.getElementById("userInputCityName");
  document.getElementById("weatherIcon").setAttribute("src", iconURL);
  cityName.textContent = data.name;
  cityTemp.textContent = Math.round(data.main.temp) + " °F";
};

var searchButtonEl = document.getElementById("userCityNameSubmit");

var callCity = function (city) {
  var apiKey = "&appid=0cab3455fdc5081541be5d657005bb3b";
  var callCityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    apiKey +
    "&units=imperial";
  fetch(callCityURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          displayWeather(city, data);
        });
      } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};
localStorage.setItem("cityLocalStorage",[] )
var formSubmitHandler = function (event) {
  // event.preventDefault();

  //taking input from html and putting it into javascript
  var userInputCityName = document.getElementById("userInputCityName");
  console.log(userInputCityName);

  //get value from input element and takes away any spaces on the left or right side, but not in the middle
  var userSearchCityName = userInputCityName.value.trim();

  if (userSearchCityName) {
    callCity(userSearchCityName);
    userInputCityName.value = "";
    // callCity(userSearchCityName);
    //console.log(event);
    // get local storage
    var citiesPreviouslySearched = localStorage.getItem("cityLocalStorage");
    // adding city name to list of previously searched names
    citiesPreviouslySearched.push(userSearchCityName);
    //adding City name to local storage
    localStorage.setItem("cityLocalStorage", citiesPreviouslySearched);
  } else {
    alert("Please enter a city name");
  }
};

//dot notation v bracket notation
// bracket notation: can use a variable as the key
//dot notation: can't have spaces in the key name, nor can you use a variable as the key

// localStorage.setItem("facts", JSON.stringify({firstNum: [1, 2, 3], planet: "neptune"}));

// var hankStuff = JSON.parse(localStorage.getItem("facts"));

// console.log(hankStuff["firstNum"]);
// console.log(hankStuff.firstNum);

// //key -- value
// //string(first argument in localstorage.setitem) is the name of the key in localStorage
// localStorage.setItem("alphabet", 123);

//stringify
// //parseInt parseFloat
// console.log(parseInt(localStorage.getItem("alphabet")));
// console.log(typeof 123);
// //typeof is an operator

searchButtonEl.addEventListener("click", formSubmitHandler);
