const search = document.querySelector('.dashboard-search button');
const weatherBlock = document.querySelector('.weather-block');
const buttonsBlock = document.querySelector('.buttons-block');
const infoHeader = document.querySelector('.info-header');
const cityName = document.querySelector('.city-name');
const nothingBlock = document.querySelector('.nothing-block');
const notFoundBlock = document.querySelector('.not-found-block');

function searchWeather() {
    const APIKey = '728b0ee6df5687559812bd3169ad77b7';
    const city = document.querySelector('.dashboard-search input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                notFoundBlock.style.display = 'flex';
                nothingBlock.style.display = 'none';
                weatherBlock.style.display = 'none';
                weatherBlock.style.opacity = 0;
                weatherBlock.style.scale = 0;
                buttonsBlock.style.display = 'none';
                buttonsBlock.style.opacity = 0;
                buttonsBlock.style.scale = 0;
                infoHeader.style.display = 'none';
                infoHeader.style.opacity = 0;
                infoHeader.style.scale = 0;
                return;
            }
            nothingBlock.style.display = 'none';
            notFoundBlock.style.display = 'none';
            weatherBlock.style.display = 'flex';
            weatherBlock.style.opacity = 1;
            weatherBlock.style.scale = 1;
            buttonsBlock.style.display = 'flex';
            buttonsBlock.style.opacity = 1;
            buttonsBlock.style.scale = 1;
            infoHeader.style.display = 'flex';
            infoHeader.style.opacity = 1;
            infoHeader.style.scale = 1;
            // saveButton.style.opacity = 1;
            // saveButton.style.scale = 1;
            // saveButton.disabled = false;
            // error404.style.display = 'none';
            // error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-block .weather-icon');
            const countryImage = document.querySelector('.info-header img');
            const temperature = document.querySelector('.weather-block .temperature');
            const description = document.querySelector('.weather-block .description');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578152.png';
                    break;

                case 'Rain':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578139.png';
                    break;

                case 'Snow':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578148.png';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578116.png';
                    break;

                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578122.png';
                    break;

                case 'Mist':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/578/578123.png';
                    break;

                default:
                    image.src = '';
            }
            switch (json.sys.country) {
                case 'UA':
                    countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555614.png';
                    break;
                case 'US':
                    countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555526.png';
                    break;
                case 'RU':
                    countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555451.png';
                    break;
                case 'PL':
                    countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555571.png';
                    break;
                case 'CA':
                    countryImage.src = 'https://cdn-icons-png.flaticon.com/512/555/555473.png';
                    break;
            }
            cityName.innerHTML = city;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            // humidity.innerHTML = `${json.main.humidity} %`;
            // wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            // countryName.innerHTML = `${json.sys.country}`;

            // weatherBox.style.display = '';
            // weatherDetails.style.display = '';
            // weatherBox.classList.add('fadeIn');
            // weatherDetails.classList.add('fadeIn');
            // country.classList.add('fadeIn');
            // container.style.height = '705px';

            console.log(json);
            console.log(json.sys.country);
        });

}

search.addEventListener('click', searchWeather);

const savedLocationsList = document.querySelector('.saved-locations-list');
const inputCity = document.querySelector('.search-box input');
const saveButton = document.querySelector('#saved-button');

saveButton.addEventListener('click', saveLocation);

function saveLocation() {
    if (inputCity.value === '') return;

    const savedItem = document.createElement('div');
    savedItem.className = 'saved-locations-item';

    const savedItemFlag = document.createElement('img');
    const imgFullURL = document.querySelector('.country img').src;
    savedItemFlag.src = imgFullURL;
    savedItem.appendChild(savedItemFlag);

    const savedItemNameBlock = document.createElement('div');
    savedItemNameBlock.className = 'saved-location-name';
    const savedItemName = document.createElement('span');
    savedItemName.textContent = inputCity.value;
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
        inputCity.value = savedItemName.textContent;
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
    console.log(inputCity.value);
}