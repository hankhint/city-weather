# City Weather
City Weather Dashboard

## Description
Leaving town? Planting a garden? Planning a picnic? Use this site to get the weather forecast for any city in the world. See today's weather and also the five day forecast.  Searched cities are saved so you can easily search for them again.

This site uses the OpenWeather API to get weather data and displays it in an easy-to-read way.

## Deployed Site Address

https://hankhint.github.io/city-weather/

# Table of Contents 
* [Features](#features)
* [How to use](#how-to-use)
* [Technology Used](#technology-used)
* [License](#license)
* [Deployed Site Address](#deployed-site-address)
* [Screenshots](#screenshots)
* [Future Development](#future-development)
* [Questions](#questions)

## Features

- Search for a city's weather using OpenWeather API
- See the current weather
- See the five day forecast
- Search for a new city
- Previous searches persist

## How to Use

- Enter a city name into the search bar, hit enter or click "Search City's Weather"
- Click city names below to see the weather of a previously searched city

## Technology Used

Uses the OpenWeather API to get weather data
https://openweathermap.org/api

and JavaScript, HTML and 
Materialize CSS
https://materializecss.com/

For easy access searched cities are saved in local storage.

## License

The application uses the MIT license.
![Badge](https://img.shields.io/badge/License-MIT-blue.svg)

## Screenshots

![image](https://user-images.githubusercontent.com/50533231/147605580-1854ac2b-600f-455a-b157-07db13e5caa3.png)

## Future Development
Currently the search function makes two fetch requests, one for the current weather and one for the five day forecast.  In the future OpenWeather OneCall api, which combines the info present in both the current apis currently used, will be implemented to streamline the code and improve performance as well.

## Questions

Send questions or comments to hankhint@gmail.com and find me on github https://github.com/hankhint