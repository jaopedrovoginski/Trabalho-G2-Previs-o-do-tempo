const apiKey = 'fd27bab45f9aaef20a2e54e1fa9d8519';

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cidade não encontrada ou erro na requisição.');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind, sys, clouds, rain, visibility } = data;
      const country = sys.country;
      displayWeather(name, country, main.temp, weather[0].description, weather[0].icon, wind.speed, main.pressure, wind.deg, clouds.all, rain?.['1h'], visibility);
      clearError();
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      displayError(error.message);
    });
}

function displayWeather(cityName, country, temperature, description, iconUrl, windSpeed, pressure, windDirection, cloudiness, rainVolume, visibility) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${cityName}, ${country}</h2>
    <img src="http://openweathermap.org/img/wn/${iconUrl}@2x.png" alt="${description}">
    <p>Temperatura: ${temperature.toFixed(1)}°C</p>
    <p>Clima: ${description}</p>
    <p>Velocidade do vento: ${windSpeed} m/s</p>
    <p>Pressão atmosférica: ${pressure} hPa</p>
    <p>Direção do vento: ${windDirection}°</p>
    <p>Nebulosidade: ${cloudiness}%</p>
    <p>Volume de chuva na última hora: ${rainVolume ? rainVolume + ' mm' : 'Sem chuva na última hora'}</p>
    <p>Visibilidade: ${visibility} metros</p>
  `;
}

function displayError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}

function clearError() {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '';
}

document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeather(city);
  } else {
    displayError('Por favor, digite o nome da cidade.');
  }
});
