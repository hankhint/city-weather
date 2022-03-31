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

  //getting user input
  var userInputCityName = document.getElementById("userInputCityName");

  //putting weather icon in html
  document.getElementById("weatherIcon").setAttribute("src", iconURL);


  //getting dt, timezone data
  console.log("dt :", data.dt);
  console.log("timezone data :", data.timezone);
  let todaysDate = new Date();
  console.log("todays date", todaysDate)
  //putting weather data in html
  cityName.textContent = "Current Weather in " + data.name;
  cityTemp.textContent = Math.round(data.main.temp) + " °F";
  cityHumid.textContent = data.main.humidity + " % Humidity";
  cityWind.textContent = data.wind.speed + " mph";
  // TODO: add UV feature
  // cityUV.textContent = "blah"
};

//display five day forecast
var displayFiveDayForecast = function (fiveday) {
  //setting keys for where to put the data in the HTML
  var fiveDayDisplay = document.getElementById("fiveDayDisplay");
console.log(fiveday.list[2])
  // clearing out the old five day for the new five day
  //  fiveDayDisplay.innerText = "";
  //added this line to create UL for new LI elements
  // var fiveDayUL = document.createElement("ul");

  //loop through five day forecast and push to html
  for (let i = 2; i < 40; i += 8) {
console.log(i, "--", fiveday.list[i]);

    //     const node = document.createElement("li");
    // const textnode = document.createTextNode("Water");
    // node.appendChild(textnode);
    // document.getElementById("myList").appendChild(node);

//     //create new element
//     const fiveDayListEl = document.createElement("li");
//     //setting attributes to element
//     fiveDayListEl.setAttribute("class", "col s12 m6 l2");
//     //declaring variable to hold unique ID for this element so that it can be populated with weather data
//     let fiveDayListElId = "fiveDayListEl" + i;
//     //assigning the unique id to the newly created element
//     fiveDayListEl.setAttribute("id", fiveDayListElId)
//     console.log(fiveDayListEl)
// console.log(fiveDayListElId);
//     //TODO: erase old data before inserting new
//    document.getElementById(fiveDayListElId).innerText = "";

//     //console.log(fiveDayListEl)
//     const fiveDayListElNode = document.createTextNode(i);
//     fiveDayListEl.appendChild(fiveDayListElNode);
//     document.getElementById("fiveDayDisplay").appendChild(fiveDayListEl);

    // // let thisElementName = "fiveDayEL" + i;
    // // console.log(thisElementName)
    // //     //changing ul to li
    //    let fivedayEL =  document.createElement("li");
    // //     console.log(fivedayEL)
    // //     fivedayEL.setAttribute("id", thisElementName)
    //    // console.log(fiveday.list[i]);

    //     var weatherIcon =
    //       "http://openweathermap.org/img/w/" +
    //       fiveday.list[i].weather[0].icon +
    //       ".png";
    //     let fivedayIcon = document.createElement("img");
    //     fivedayIcon.src = weatherIcon;
    //     //fiveDayDisplay.appendChild(weatherIcon)

    //     //document.getElementById('body').appendChild(img);

    //     //converting UTC seconds into date without time of day
    //     var fivedayseconds = fiveday.list[i].dt;
    //     var fivedaydate = new Date(0);
    //     fivedaydate.setUTCSeconds(fivedayseconds);

    //     fivedayEL.textContent =
    //       fivedaydate.toDateString() +
    //       " " +
    //       Math.round(fiveday.list[i].main.temp) +
    //       " F " +
    //       fiveday.list[i].wind.speed +
    //       " mph " +
    //       fiveday.list[i].main.humidity +
    //       " perecent humidity";
    //       //document.getElementById('body').appendChild(img);
    //    // document.getElementById(thisElementName).appendChild(fivedayIcon);
    //    fiveDayDisplay.appendChild(weatherIcon);
    //    fiveDayDisplay.appendChild(fivedayEL);
    //   //  document.getElementById(thisElementName).appendChild(fivedayEL);
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
          console.log("first fetch", data);
          displayWeather(city, data);

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
    console.log(citiesPreviouslySearched);
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
