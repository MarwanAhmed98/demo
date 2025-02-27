var LocationInput = document.getElementById('LocationInput');
var Day = document.querySelector('.Day');
var Day2 = document.querySelector('.Day2');
var Day3 = document.querySelector('.Day3');
var date = document.querySelector('.date');
var Cname = document.querySelector('.Cname');
var Degree = document.querySelector('.Degree');
var Custom = document.querySelector('.Custom');
var Custom2 = document.querySelector('.Custom2');
var Custom3 = document.querySelector('.Custom3');
var Degree2 = document.querySelector('.Degree2');
var Degree3 = document.querySelector('.Degree3');
var Degree4 = document.querySelector('.Degree4');
var Degree5 = document.querySelector('.Degree5');
var FirstCon = document.querySelector('.FirstCon');
var SecImg = document.querySelector('.SecImg img');
var WeatherIcon=document.querySelector('.Weather-Icon');
var WeatherIcon2=document.querySelector('.Weather-Icon2');
var WeatherIcon3=document.querySelector('.Weather-Icon3');
var LocationInput = document.getElementById('LocationInput');
var Day = document.querySelector('.Day');
var Day2 = document.querySelector('.Day2');
var Day3 = document.querySelector('.Day3');
var date = document.querySelector('.date');
var Cname = document.querySelector('.Cname');
var Degree = document.querySelector('.Degree');
var Custom = document.querySelector('.Custom');
var Custom2 = document.querySelector('.Custom2');
var Custom3 = document.querySelector('.Custom3');
var Degree2 = document.querySelector('.Degree2');
var Degree3 = document.querySelector('.Degree3');
var Degree4 = document.querySelector('.Degree4');
var Degree5 = document.querySelector('.Degree5');
var FirstCon = document.querySelector('.FirstCon');
var SecImg = document.querySelector('.SecImg img');
var WeatherIcon = document.querySelector('.Weather-Icon');
var WeatherIcon2 = document.querySelector('.Weather-Icon2');
var WeatherIcon3 = document.querySelector('.Weather-Icon3');
var apikey = '858d692048d0311546d4671e9340af1f';

async function getWeather(city) {
    try {
        var geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`);
        var geoData = await geoResponse.json();
        var { lat, lon, name } = geoData[0];
        var weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
        var weatherData = await weatherResponse.json();
        updateUI(name, weatherData);
        saveDataToLocalStorage(name, weatherData); 
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

function updateUI(name, weatherData) {
    document.querySelector('.Cname').innerHTML = name;
    document.querySelector('.Degree').innerHTML = weatherData.list[0].main.temp + '°C';
    document.querySelector('.Custom').innerHTML = weatherData.list[0].weather[0].description;
    const date = weatherData.list[0].dt_txt;
    const dateObject = new Date(date);
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    const optionsDay = { weekday: 'long' };
    const formatDay = dateObject.toLocaleDateString('en-US', optionsDay);
    document.querySelector('.date').innerHTML = formattedDate;
    document.querySelector('.Day').innerHTML = formatDay;

    const datetoday = new Date();
    const datetommorow = new Date(datetoday);
    datetommorow.setDate(datetoday.getDate() + 1);
    const optionstommorow = { weekday: 'long' };
    const formattedtommorow = datetommorow.toLocaleDateString('en-US', optionstommorow);
    document.querySelector('.Day2').innerHTML = formattedtommorow;

    if (weatherData.list[8]) {
        document.querySelector('.Degree2').innerHTML = weatherData.list[8].main.temp + '°C';
        document.querySelector('.Degree3').innerHTML = weatherData.list[8].main.feels_like + '°';
        document.querySelector('.Custom2').innerHTML = weatherData.list[8].weather[0].description;
    }

    const datelatertommorow = new Date(datetoday);
    datelatertommorow.setDate(datetoday.getDate() + 2);
    const optionslatertommorow = { weekday: 'long' };
    const formattedlatertommorow = datelatertommorow.toLocaleDateString('en-US', optionslatertommorow);
    document.querySelector('.Day3').innerHTML = formattedlatertommorow;

    if (weatherData.list[12]) {
        document.querySelector('.Degree4').innerHTML = weatherData.list[12].main.temp + '°C';
        document.querySelector('.Degree5').innerHTML = weatherData.list[12].main.feels_like + '°';
        document.querySelector('.Custom3').innerHTML = weatherData.list[12].weather[0].description;
    }
    updateWeatherIcons();
}

function updateWeatherIcons() {
    if (Custom.innerHTML === "overcast clouds") {
        WeatherIcon.src = "images/122.png";
    } else if (Custom.innerHTML === "clear sky") {
        WeatherIcon.src = "images/113.png";
    } else if (Custom.innerHTML === "light rain") {
        WeatherIcon.src = "images/Rain.png";
    } else if (Custom.innerHTML === "snow") {
        WeatherIcon.src = "images/snow.png";
    } else if (Custom.innerHTML === "mist") {
        WeatherIcon.src = "images/Mist.png";
    } else if (Custom.innerHTML === "scattered clouds") {
        WeatherIcon.src = "images/116.png";
    }

    if (Custom2.innerHTML === "overcast clouds") {
        WeatherIcon2.src = "images/122.png";
    } else if (Custom2.innerHTML === "clear sky") {
        WeatherIcon2.src = "images/113.png";
    } else if (Custom2.innerHTML === "light rain") {
        WeatherIcon2.src = "images/Rain.png";
    } else if (Custom2.innerHTML === "snow") {
        WeatherIcon2.src = "images/snow.png";
    } else if (Custom2.innerHTML === "mist") {
        WeatherIcon2.src = "images/Mist.png";
    } else if (Custom2.innerHTML === "scattered clouds") {
        WeatherIcon2.src = "images/116.png";
    }

    if (Custom3.innerHTML === "overcast clouds") {
        WeatherIcon3.src = "images/122.png";
    } else if (Custom3.innerHTML === "clear sky") {
        WeatherIcon3.src = "images/113.png";
    } else if (Custom3.innerHTML === "light rain") {
        WeatherIcon3.src = "images/Rain.png";
    } else if (Custom3.innerHTML === "snow") {
        WeatherIcon3.src = "images/snow.png";
    } else if (Custom3.innerHTML === "mist") {
        WeatherIcon3.src = "images/Mist.png";
    } else if (Custom3.innerHTML === "scattered clouds") {
        WeatherIcon3.src = "images/116.png";
    }
}

function saveDataToLocalStorage(name, weatherData) {
    const data = {
        name,
        weatherData
    };
    localStorage.setItem('weatherData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const data = localStorage.getItem('weatherData');
    if (data) {
        const { name, weatherData } = JSON.parse(data);
        updateUI(name, weatherData); 
    }
}
window.onload = function () {
    loadDataFromLocalStorage();
};
