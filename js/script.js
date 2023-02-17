// const container = document.querySelector('.container');
// const search = document.querySelector('.search-bar button');
// const weatherBox = document.querySelector('.weather-box');
// const weatherDetails = document.querySelector('.weather-details');
// const notFound = document.querySelector('.not-found');

// search.addEventListener('click', () => {
//     const API_KEY = '584ca977c587314c7e2a79863cea8226';
//     const city = document.querySelector('.search-bar input').value;

//     if (city === '') {
//         return;
//     }
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
//         .then(response => response.json())
//         .then(json => {
//             if (json.cod === '404') {
//                 weatherBox.style.display = 'none';
//                 weatherDetails.style.display = 'none';
//                 notFound.style.display = 'block';
//             }
//             notFound.style.display = 'none';

//             const image = document.querySelector('.weather-box img');
//             const temperature = document.querySelector('.weather-box .temperature');
//             const description = document.querySelector('.weather-box .description');

//             const humidity = document.querySelector('.weather-details .humidity .info-box span');
//             const wind = document.querySelector('.weather-details .wind .info-box span');

//             switch (json.weather[0].main) {
//                 case 'Clear':
//                     image.src = 'img/sun.png';
//                     break;
//                 case 'Rain':
//                     image.src = 'img/rain.png';
//                     break;
//                 case 'Snow':
//                     image.src = 'img/snow.png';
//                     break;
//                 case 'Clouds':
//                     image.src = 'img/cloud.png';
//                     break;
//                 case 'Extreme':
//                     image.src = 'img/extreme.png';
//                     break;
//                 default:
//                     image.src = '';
//                     break;
//             }
//             temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
//             description.innerHTML = `${json.weather[0].description}`;
//             humidity.innerHTML = `${json.main.humidity}%`;
//             wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

//             weatherBox.style.display = 'block';
//             weatherDetails.style.display = 'block';

//         });
// });
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const country = document.querySelector('.country');

function searchWeather() {
    const APIKey = '728b0ee6df5687559812bd3169ad77b7';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const countryImage = document.querySelector('.country img');
            const countryName = document.querySelector('.country span');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/sun.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/extreme.png';
                    break;

                default:
                    image.src = '';
            }
            switch (json.sys.country) {
                case 'UA':
                    countryImage.src = 'img/flags/ua-flag.png';
                    break;
                case 'US':
                    countryImage.src = 'img/flags/us-flag.png';
                    break;
                case 'RU':
                    countryImage.src = 'img/flags/ru-flag.png';
                    break;
                case 'PL':
                    countryImage.src = 'img/flags/pl-flag.png';
                    break;
                case 'PL':
                    countryImage.src = 'img/flags/ca-flag.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity} %`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            countryName.innerHTML = `${json.sys.country}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            country.classList.add('fadeIn');
            container.style.height = '705px';

            console.log(json.sys.country);


        });

}

search.addEventListener('click', searchWeather);

const savedLocationsList = document.querySelector('.saved-locations-list');
const inputCity = document.querySelector('.search-box input');