var displayWeather = function (city, data) {
  //weather icon data
  var iconCode = data.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

  //setting keys for where to put the data
  var cityName = document.getElementById("cityName");
  var cityTemp = document.getElementById("cityTemp");
  var cityHumid = document.getElementById("cityHumid");
  var cityWind = document.getElementById("cityWind");
  //var cityUV = document.getElementById("cityUV");

  var userInputCityName = document.getElementById("userInputCityName");
  //putting weather icon in html
  document.getElementById("weatherIcon").setAttribute("src", iconURL);

  //putting weather data in html
  cityName.textContent = data.name;
  cityTemp.textContent = Math.round(data.main.temp) + " °F";
  cityHumid.textContent = data.main.humidity + " % Humidity";
  cityWind.textContent = data.wind.speed + " mph";
  //cityUV.textContent = "blah"
};

//display five day forecast
var displayFiveDayForecast = function (fiveday) {
  
//to do 
// set up div for all five day forecasts
//set up write html to div
//set up for loop to loop through each different part


  //setting keys for where to put the data in the HTML
  var fiveDayDisplay = document.getElementById("fiveDayDisplay");


  //put data in the HTML
  
  //code that works and gets five day forecast info from the fetch request payload
  //fiveday.list[0].main.temp ,fiveday.list[0].wind.speed ,fiveday.list[0].main.humidity;



// var resetFiveDay = "loading";
// fiveDayDisplay.appendChild();
// clearing out the old five day for the new five day
//document.getElementById(fiveDayDisplay).innerHTML = "";
fiveDayDisplay.innerText = "";

//loop through five day forecast and push to html
for (let i = 1; i < 6; i++) {
let fivedayEL = document.createElement('li');
fivedayEL.textContent = fiveday.list[i].main.temp + " F "  + fiveday.list[i].wind.speed + " mph " + fiveday.list[i].main.humidity + " perecent humidity";
fiveDayDisplay.appendChild(fivedayEL);
}

//fiveDayDisplay to have three h1s, one for each part of the five day 5dayforecast




//


};

var searchButtonEl = document.getElementById("userCityNameSubmit");

//api call to get the city's weather and five day forecast
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
          displayWeather(city, data);

          //get fiveday forecast
          fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
              city +
              "&appid=0cab3455fdc5081541be5d657005bb3b" +
              "&units=imperial"
          ).then(function (response) {
            if (response.ok) {
              response.json().then(function (fiveday) {
                displayFiveDayForecast(fiveday);
              });
            }
          });
        });
      } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

//initialize local storage that holds city names that have been searched
if (localStorage.getItem("cityLocalStorage") == undefined) {
  localStorage.setItem("cityLocalStorage", JSON.stringify([]));
}

//search history array as a global variable
//add to search history global variable on click, then

var formSubmitHandler = function (event) {
  // event.preventDefault();

  //taking input from html and putting it into javascript
  var userInputCityName = document.getElementById("userInputCityName");
  //console.log(userInputCityName);

  //get value from input element, userInputCityName, and takes away any spaces on the left or right side, but not in the middle
  var userSearchCityName = userInputCityName.value.trim();
  //console.log(userInputCityName.value.trim());
  //console.log(userSearchCityName);

  if (userSearchCityName) {
    callCity(userSearchCityName);
    userInputCityName.value = "";

    //creating button for searched city
    let btn = document.createElement("button");
    btn.innerHTML = userSearchCityName;
    btn.type = "submit";
    btn.name = userSearchCityName + "formBtn";
    document.body.appendChild(btn);
    //creating on click event api call
    btn.onclick = function () {
      callCity(userSearchCityName);
    };

    // get local storage of previously searched cities
    var citiesPreviouslySearched = JSON.parse(
      localStorage.getItem("cityLocalStorage")
    );

    // adding city name to list of previously searched names
    citiesPreviouslySearched.push(userSearchCityName);

    //adding City name to local storage along with the past searched cities
    localStorage.setItem(
      "cityLocalStorage",
      JSON.stringify(citiesPreviouslySearched)
    );
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
