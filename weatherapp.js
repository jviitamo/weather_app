const button = document.getElementById("button");
const inputField = document.getElementById("input");
const loc = document.getElementById("loc");

const url3 = img => `https://openweathermap.org/img/wn/${img}@2x.png`;

let weatherData;
let city;
let coords;

function Location() {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    coords = "lat=" + lat + "&lon=" + lon;
  });
}

document.addEventListener("DOMContentLoaded", Location());
//function alert() {
//setInterval(fetchWeatherData, 5000);
//}
let API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&APPID=d733048a0cb42d763d0180c657f72648&lang=fi";
let weather = document.getElementById("weather");
let kaupunki = document.getElementById("city");
button.addEventListener("click", event => {
  event.preventDefault();
  city = "q=" + inputField.value;
});

loc.addEventListener("click", event => {
  event.preventDefault();
  city = coords;
  fetchWeatherData();
});

button.addEventListener("click", fetchWeatherData);

function fetchWeatherData() {
  weather.innerHTML = "";
  kaupunki.innerHTML = "";
  let one = API_URL.replace("q=Helsinki", city);
  fetch(one)
    .then(response => response.json())
    .then(data => {
      weatherData = JSON.parse(JSON.stringify(data));

      const li = document.createElement("li");
      const div1 = document.createElement("div");
      const div3 = document.createElement("div");

      div1.innerText = data.name;
      const desc =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
      div3.innerText = `${data.main.temp} C, ${desc}`;
      kaupunki.appendChild(div1);
      li.appendChild(div3);
      weather.appendChild(li);
      document.getElementById("img").src = url3(weatherData.weather[0].icon)

      //alert();
    });
}
