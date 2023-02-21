const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const clearSearch = document.querySelector('.clear-search');
const weatherBlock = document.querySelector('.weather-mi');
//const buttonsBlock = document.querySelector('.buttons-block');
//const infoHeader = document.querySelector('.info-header');
const cityName = document.querySelector('.location-name');
const nothingBlock = document.querySelector('#nothing');
const notFoundBlock = document.querySelector('#notfound');

function searchWeather() {
    const APIKey = '584ca977c587314c7e2a79863cea8226';
    const tempCity = searchInput.value;

    if (tempCity === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                notFoundBlock.style.display = 'flex';
                nothingBlock.style.display = 'none';
                weatherBlock.style.display = 'none';
                weatherBlock.style.opacity = 0;
                weatherBlock.style.scale = 0;
                // buttonsBlock.style.display = 'none';
                // buttonsBlock.style.opacity = 0;
                // buttonsBlock.style.scale = 0;
                // infoHeader.style.display = 'none';
                // infoHeader.style.opacity = 0;
                // infoHeader.style.scale = 0;
                return;
            }
            nothingBlock.style.display = 'none';
            notFoundBlock.style.display = 'none';
            weatherBlock.style.display = 'flex';
            weatherBlock.style.opacity = 1;
            weatherBlock.style.scale = 1;
            // buttonsBlock.style.display = 'flex';
            // buttonsBlock.style.opacity = 1;
            // buttonsBlock.style.scale = 1;
            // infoHeader.style.display = 'flex';
            // infoHeader.style.opacity = 1;
            // infoHeader.style.scale = 1;

            const city = tempCity.charAt(0).toUpperCase() + tempCity.slice(1);

            const image = document.querySelector('.weather-mi img');

            image.ondragstart = () => {
                return false;
            };
            //const countryImage = document.querySelector('.info-header img');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');

            // const feelsLike = document.querySelector('.feels-like');
            // const minTemperature = document.querySelector('.min-temperature');
            // const maxTemperature = document.querySelector('.max-temperature');

            const humidity = document.querySelector('#humidity');
            const windSpeed = document.querySelector('#windspeed');
            const visibility = document.querySelector('#visibility');
            const cloudiness = document.querySelector('#cloudiness');
            const pressure = document.querySelector('#pressure');
            // const country = document.querySelector('.country');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064276.png';
                    break;

                case 'Rain':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064361.png';
                    break;

                case 'Snow':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064317.png';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064269.png';
                    break;

                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064311.png';
                    break;

                case 'Mist':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/4064/4064445.png';
                    break;

                default:
                    image.src = '';
            }
            // switch (json.sys.country) {
            //     case 'UA':
            //         countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555614.png';
            //         break;
            //     case 'US':
            //         countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555526.png';
            //         break;
            //     case 'RU':
            //         countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555451.png';
            //         break;
            //     case 'PL':
            //         countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555571.png';
            //         break;
            //     case 'CA':
            //         countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555473.png';
            //         break;
            // }
            cityName.innerHTML = city;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            // feelsLike.innerHTML = `${parseInt(json.main.feels_like)}<span>°C</span>`;
            // minTemperature.innerHTML = `${parseInt(json.main.temp_min)}<span>°C</span>`;
            // maxTemperature.innerHTML = `${parseInt(json.main.temp_max)}<span>°C</span>`;
            humidity.innerHTML = `${json.main.humidity}<span> %</span>`;
            windSpeed.innerHTML = `${parseInt(json.wind.speed)}<span> km/h</span>`;
            let visibilityValue = json.visibility / 1000;
            visibility.innerHTML = `${visibilityValue}<span> km</span>`;
            cloudiness.innerHTML = `${json.clouds.all}<span> %</span>`;
            pressure.innerHTML = `${json.main.pressure}<span> hPa</span>`;
            // country.innerHTML = `${json.sys.country}`;

            const newDescription = json.weather[0].description;
            const changedDescription = newDescription.charAt(0).toUpperCase() + newDescription.slice(1);
            description.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;' + changedDescription;

            console.log(json);
            console.log(json.sys.country);
        });

}

search.addEventListener('click', searchWeather);
clearSearch.addEventListener('click', clearSearchInput);

const savedLocationsList = document.querySelector('.saved-locations-list');
// const inputCity = document.querySelector('.search-box input');
//const saveButton = document.querySelector('#saved-button');

//saveButton.addEventListener('click', saveLocation);

function saveLocation() {
    if (searchInput.value === '') return;

    const savedItem = document.createElement('div');
    savedItem.className = 'saved-locations-item';

    const savedItemFlag = document.createElement('img');
    const imgFullURL = document.querySelector('.country img').src;
    savedItemFlag.src = imgFullURL;
    savedItem.appendChild(savedItemFlag);

    const savedItemNameBlock = document.createElement('div');
    savedItemNameBlock.className = 'saved-location-name';
    const savedItemName = document.createElement('span');
    savedItemName.textContent = searchInput.value;
    savedItemNameBlock.appendChild(savedItemName);
    savedItem.appendChild(savedItemNameBlock);

    const searchSavedItem = document.createElement('button');
    const savedLocationBtns = document.createElement('div');
    savedLocationBtns.className = 'saved-location-btns';
    searchSavedItem.className = 'fa-solid fa-magnifying-glass';
    searchSavedItem.id = 'search-btn';
    savedLocationBtns.appendChild(searchSavedItem);
    searchSavedItem.addEventListener('click', (e) => {
        //savedLocationsList.removeChild(savedItem);
        searchInput.value = savedItemName.textContent;
        searchWeather();
    });
    const deleteSavedItem = document.createElement('button');
    deleteSavedItem.className = 'fa-solid fa-trash';
    deleteSavedItem.id = 'delete-btn';
    savedLocationBtns.appendChild(deleteSavedItem);
    deleteSavedItem.addEventListener('click', (e) => {
        savedLocationsList.removeChild(savedItem);
        // inputCity.value = savedItemName.textContent;
        // searchWeather();
    });

    savedItem.appendChild(savedLocationBtns);

    savedLocationsList.appendChild(savedItem);
    console.log(searchInput.value);
}

function clearSearchInput() {
    searchInput.value = "";
    notFoundBlock.style.display = 'none';
    nothingBlock.style.display = 'flex';
    weatherBlock.style.display = 'none';
    weatherBlock.style.opacity = 0;
    weatherBlock.style.scale = 0;
    // buttonsBlock.style.display = 'none';
    // buttonsBlock.style.opacity = 0;
    // buttonsBlock.style.scale = 0;
    // infoHeader.style.display = 'none';
    // infoHeader.style.opacity = 0;
    // infoHeader.style.scale = 0;
}

const logo = document.querySelector('.logo-block img');
logo.ondragstart = () => {
    return false;
};