let now = new Date();
let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
][now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let time = dayOfWeek + " " + hour + ":" + (minute < 10 ? "0" + minute : minute);
document.querySelector(".week-time").textContent = time;

let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=bb4c28452659bc04e7a8e1db44fec895&units=metric";

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(apiUrl + "&lat=" + lat + "&lon=" + lon + "&units=metric")
    .then((response) => {
      let city = response.data.name;
      let temp = Math.round(response.data.main.temp);
      let maxTemp = Math.round(response.data.main.temp_max);
      let minTemp = Math.round(response.data.main.temp_min);
      let realFeel = Math.round(response.data.main.feels_like);
      let precipitation = response.data.clouds.all;
      let windSpeed = response.data.wind.speed;
      console.log(`The temperature at your location is ${temp}°C`);
      document.querySelector("#city-name").textContent = city;
      document.querySelector("#temperature").textContent = temp;
      document.querySelector("#maxTemperature").textContent = `${maxTemp}ºC `;
      document.querySelector("#minTemperature").textContent = `${minTemp}ºC `;
      document.querySelector("#realFeel").textContent = `${realFeel}º`;
      document.querySelector(
        "#precipitation"
      ).textContent = `${precipitation}%`;
      document.querySelector("#windSpeed").textContent = `${windSpeed}km/h`;
    });
}

function searchCity(city) {
  axios.get(apiUrl + "&q=" + city + "&units=metric").then((response) => {
    let city = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let maxTemp = Math.round(response.data.main.temp_max);
    let minTemp = Math.round(response.data.main.temp_min);
    let realFeel = Math.round(response.data.main.feels_like);
    let precipitation = response.data.clouds.all;
    let windSpeed = response.data.wind.speed;
    console.log(`The temperature in ${city} is ${temp}°C`);
    document.querySelector("#city-name").textContent = city;
    document.querySelector("#temperature").textContent = temp;
    document.querySelector("#maxTemperature").textContent = `${maxTemp}º`;
    document.querySelector("#minTemperature").textContent = `${minTemp}º`;
    document.querySelector("#realFeel").textContent = `${realFeel}º`;
    document.querySelector("#precipitation").textContent = `${precipitation}%`;
    document.querySelector("#windSpeed").textContent = `${windSpeed}km/h`;
  });
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  if (city) {
    searchCity(city);
    cityInput.value = "";
  }
}

function handleCurrent() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      axios
        .get(apiUrl.replace("{lat}", lat).replace("{lon}", lon))
        .then((response) => {
          let city = response.data.name;
          let temp = Math.round(response.data.main.temp);
          let maxTemp = Math.round(response.data.main.temp_max);
          let minTemp = Math.round(response.data.main.temp_min);
          let realFeel = Math.round(response.data.main.feels_like);
          let precipitation = response.data.clouds.all;
          let windSpeed = response.data.wind.speed;
          console.log(`The temperature at your location is ${temp}°C`);
          document.querySelector("#city-name").textContent = city;
          document.querySelector("#temperature").textContent = temp;
          document.querySelector(
            "#maxTemperature"
          ).textContent = `${maxTemp}ºC`;
          document.querySelector(
            "#minTemperature"
          ).textContent = `${minTemp}ºC`;
          document.querySelector("#realFeel").textContent = `${realFeel}ºC`;
          document.querySelector(
            "#precipitation"
          ).textContent = `${precipitation}%`;
          document.querySelector("#windSpeed").textContent = `${windSpeed}km/h`;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          alert("Failed to fetch weather data. Please try again later.");
        });
    });
  }
}

document.querySelector(".btn-primary").addEventListener("click", handleSearch);
document.querySelector(".btn-success").addEventListener("click", handleCurrent);
