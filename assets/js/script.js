// sets today's weather to HTML
var cityUV = document.getElementById("cityUV");

var displayWeather = function (city, data) {
  //weather icon data
  var iconCode = data.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

  //setting keys for where to put the data
  var cityName = document.getElementById("cityName");
  var cityTemp = document.getElementById("cityTemp");
  var cityHumid = document.getElementById("cityHumid");
  var cityWind = document.getElementById("cityWind");
  // fetch(
  //   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  //     data.coord.lat +
  //     "&lon=" +
  //     data.coord.lon +
  //     "&exclude=hourly,daily&appid=0cab3455fdc5081541be5d657005bb3b"
  // ).then(function (response) {
  //   if (response.ok) {
  //     response.json().then(function (uvInfo) {
  //       cityUV.textContent = uvInfo.current.uvi;
  //     });
  //   }
  // });

  //getting user input
  var userInputCityName = document.getElementById("userInputCityName");

  //putting weather icon in html
  document.getElementById("weatherIcon").setAttribute("src", iconURL);

  //putting weather data in html
  cityName.textContent = "Current Weather in " + data.name;
  cityTemp.textContent = Math.round(data.main.temp) + " °F";
  cityHumid.textContent = data.main.humidity + " % Humidity";
  cityWind.textContent = data.wind.speed + " mph";
  // cityUV.textContent = "blah"
};

//display five day forecast
var displayFiveDayForecast = function (fiveday) {
  //setting keys for where to put the data in the HTML
  var fiveDayDisplay = document.getElementById("fiveDayDisplay");

  //code that works and gets five day forecast info from the fetch request payload
  //fiveday.list[0].main.temp ,fiveday.list[0].wind.speed ,fiveday.list[0].main.humidity;

  // clearing out the old five day for the new five day

  fiveDayDisplay.innerText = "";
  //added this line to create UL for new LI elements
var fiveDayUL = document.createElement("ul");
  //loop through five day forecast and push to html
  for (let i = 0; i < 41; i += 8) {
   // console.log(i);

   //changing ul to li
    let fivedayEL = document.createElement("ul");

    var weatherIcon =
      "http://openweathermap.org/img/w/" +
      fiveday.list[i].weather[0].icon +
      ".png";

    let fivedayIcon = document.createElement("img");
    fivedayIcon.src = weatherIcon;

    //     var utcSeconds = 1234567890;
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);

    //converting UTC seconds into date without time of day
    var fivedayseconds = fiveday.list[i].dt;
    var fivedaydate = new Date(0);
    fivedaydate.setUTCSeconds(fivedayseconds);

    //console.log(fivedaydate.toDateString());
    //console.log(fiveday.list[i].weather[0].icon);

    fivedayEL.textContent =
      // fiveday.list[i].dt_txt +

      fivedaydate.toDateString() + " " +
      fiveday.list[i].main.temp +
      " F " +
      fiveday.list[i].wind.speed +
      " mph " +
      fiveday.list[i].main.humidity +
      " perecent humidity";
    fiveDayDisplay.appendChild(fivedayIcon);
    fiveDayDisplay.appendChild(fivedayEL);
  }
};

var searchButtonEl = document.getElementById("userCityNameSubmit");

//api call to get the city's current weather and five dayforecast
var callCity = function (city) {
  var apiKey = "&appid=0cab3455fdc5081541be5d657005bb3b";
  var callCityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    apiKey +
    "&units=imperial";

  //get current weather
  fetch(callCityURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(city, data);
         
          // fetch(
          //   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          //     data.coord.lat +
          //     "&lon=" +
          //     data.coord.lon +
          //     "&exclude=hourly,daily&appid=0cab3455fdc5081541be5d657005bb3b"
          // ).then(function (response) {
          //   if (response.ok) {
          //     response.json().then(function (uvInfo) {
          //       cityUV.textContent = uvInfo.current.uvi;
          //     });
          //   }
          // });

          //get fiveday forecast
          fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
              city +
              "&appid=0cab3455fdc5081541be5d657005bb3b" +
              "&units=imperial"
          ).then(function (response) {
            if (response.ok) {
              //send response to display function
              response.json().then(function (fiveday) {
                displayFiveDayForecast(fiveday);
                //console.log(fiveday);
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

var formSubmitHandler = function (event) {
  //taking input from html and putting it into javascript
  var userInputCityName = document.getElementById("userInputCityName");
  //console.log(userInputCityName);

  //get value from input element, userInputCityName, and takes away any spaces on the left or right side, but not in the middle
  var userSearchCityName = userInputCityName.value.trim();

  if (userSearchCityName) {
    callCity(userSearchCityName);
    userInputCityName.value = "";

    //creating button for searched city
    let btn = document.createElement("button");
    btn.innerHTML = userSearchCityName;
    btn.type = "submit";
    btn.className = "collection-item";
    btn.name = userSearchCityName + "formBtn";
    searchedCityList.appendChild(btn);

    //creating on click event api call
    btn.onclick = function () {
      callCity(userSearchCityName);
    };

    // get local storage of previously searched cities
    var citiesPreviouslySearched = JSON.parse(
      localStorage.getItem("cityLocalStorage")
    );
console.log(citiesPreviouslySearched)
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

searchButtonEl.addEventListener("click", formSubmitHandler);
