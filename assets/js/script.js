

var displayWeather = function (city, data) {
    var iconCode = data.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var cityName = document.getElementById("cityName");
    var cityTemp = document.getElementById("cityTemp");
    document.getElementById("weatherIcon").setAttribute("src", iconURL);
    cityName.textContent = data.name;
    cityTemp.textContent = Math.round(data.main.temp) + " °F";
  };

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
            console.log(data);
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
  

var getWeatherApi = function () {
      callCity("Honolulu");

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



getWeatherApi();