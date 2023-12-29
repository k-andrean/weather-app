import weatherData from './weather.json';

function loadWeatherData() {
  try {
    const parsedWeatherData = JSON.parse(weatherData);
    const weatherArray = Array.isArray(parsedWeatherData) ? parsedWeatherData : Object.values(parsedWeatherData);

    if (!Array.isArray(weatherArray)) {
      console.error('Failed to convert weatherData to an array');
      return [];
    }

    return weatherArray;
  } catch (error) {
    console.error('Failed to parse weatherData as JSON:', error);
    return [];
  }
}

function createIconArray(weatherConditions) {
  const arrayWeatherIcon = {};

  weatherConditions.forEach((element) => {
    const iconText = element.icon;
    const imagePath = `../assets/images/icons/${iconText}.png`;
    const image = new Image();
    image.src = imagePath;
    arrayWeatherIcon[iconText] = image;
  });

  return arrayWeatherIcon;
}

function createConditionImageMap(weatherConditions, iconsArray) {
  const conditionImageMap = {};

  weatherConditions.forEach((element) => {
    const weatherText = element.day;
    const iconText = element.icon;
    const imageIcon = iconsArray[iconText];
    conditionImageMap[weatherText] = imageIcon;
  });

  return conditionImageMap;
}

export { loadWeatherData, createIconArray, createConditionImageMap };
