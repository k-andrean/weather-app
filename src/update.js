import { loadWeatherData, createIconArray, createConditionImageMap } from './weather.js';
import Default from '../assets/images/icons/default.png';

// create object mapping to use for updating main html element UI with appropriate weather data
const weatherConditions = loadWeatherData();
const iconsArray = createIconArray(weatherConditions);
const conditionImageMap = createConditionImageMap(weatherConditions, iconsArray);

const defaultImage = new Image();
defaultImage.src = Default;

// function for getting right icon to fit current weather forecast
function getImageUrlForCondition(condition) {
  const matchingIcon = conditionImageMap[condition];
  return matchingIcon ? matchingIcon.src : defaultImage.src;
}

export default function updateUIWithData(data) {
  const currentWeather = document.querySelector('.description-text');
  const currentCelciusTemp = document.querySelector('.celc-data');
  const currentFahreinheitTemp = document.querySelector('.fahr-data');
  const windSpeed = document.querySelector('.wind-data');
  const gustSpeed = document.querySelector('.gust-data');
  const humidityText = document.querySelector('.humidity-data');
  const hourText = document.querySelector('.hour-data');
  const imageElement = document.querySelector('img');

  const weatherCondition = data.current.condition.text;

  currentCelciusTemp.innerHTML = `${data.current.temp_c}&deg;C`;
  currentFahreinheitTemp.innerHTML = `${data.current.temp_f}&nbsp;&deg;F`;
  currentWeather.textContent = weatherCondition;
  windSpeed.innerHTML = data.current.wind_mph;
  gustSpeed.innerHTML = data.current.gust_mph;
  humidityText.innerHTML = data.current.humidity;

  const currentDate = new Date();

  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // If the minutes are less than 10, add a leading zero
  const formattedMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

  const formattedTime = `${currentHour}.${formattedMinutes}`;

  hourText.textContent = formattedTime;

  const imageUrl = getImageUrlForCondition(weatherCondition);

  // Update the image element in the HTML

  imageElement.src = imageUrl;
  imageElement.alt = `Weather Image for ${weatherCondition}`;
}
