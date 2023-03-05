'use strict';

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-input");
const clearSearch = document.querySelector(".clear-search");
const weatherBlock = document.querySelector(".weather-mi");

const cityName = document.querySelector(".location-name");
const nothingBlock = document.querySelector("#nothing");
const notFoundBlock = document.querySelector("#notfound");

const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windspeed");
const visibility = document.querySelector("#visibility");
const cloudiness = document.querySelector("#cloudiness");
const pressure = document.querySelector("#pressure");

const temperatureTypeButtons = document.querySelector('.temperature-type-block');
const celsiumButton = temperatureTypeButtons.firstElementChild;
const fahrenheitButton = temperatureTypeButtons.lastElementChild;

let defaultTemperatureType = 'C';
let savedLocationOption = {
    location: '',
    country: '',
    id: 0
}
let searchHistoryItem = {
    location: '',
    country: '',
    time: 0
}
let user = {
    savedLocations: [],
    temperatureType: '',
    searchHistory: []
}

if (localStorage.getItem('user')) {
    let requiredUser = localStorage.getItem('user');
    let parsedRequiredUser = JSON.parse(requiredUser);
    if (parsedRequiredUser.temperatureType === 'C') {
        celsiumButton.id = "current-temp-type";
        fahrenheitButton.id = "";
    } else if (parsedRequiredUser.temperatureType === 'F') {
        celsiumButton.id = "";
        fahrenheitButton.id = "current-temp-type";
    }
    if (parsedRequiredUser.savedLocations.length === 0) {
        const noneSavedItem = document.querySelector("#saved-location-none");
        noneSavedItem.style.display = "flex";
    } else if (parsedRequiredUser.savedLocations.length > 0) {
        const noneSavedItem = document.querySelector("#saved-location-none");
        noneSavedItem.style.display = "none";
        for (let i = 0; i < parsedRequiredUser.savedLocations.length; i++) {
            const savedLocationsList = document.querySelector(".saved-locations-items");

            const savedItem = document.createElement("div");
            savedItem.className = "saved-locations-item";

            const savedItemName = document.createElement("p");
            savedItemName.className = "saved-locations-name";
            savedItemName.textContent = parsedRequiredUser.savedLocations[i].location;
            savedItem.appendChild(savedItemName);

            const savedItemFlag = document.createElement("img");
            const countryCode = parsedRequiredUser.savedLocations[i].country;
            const countryFlagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
            savedItemFlag.src = countryFlagURL;
            savedItem.appendChild(savedItemFlag);

            const savedLocationButtons = document.createElement("div");
            savedLocationButtons.className = "saved-locations-buttons";
            savedItem.appendChild(savedLocationButtons);

            const searchSavedItem = document.createElement("button");
            searchSavedItem.className = "saved-location-search";
            const searchIcon = document.createElement("i");
            searchIcon.className = "bi bi-search";
            searchSavedItem.appendChild(searchIcon);
            // searchSavedItem.addEventListener("click", (e) => {
            //     searchInput.value = savedItemName.textContent;
            //     searchWeather();
            // });
            $(searchSavedItem).on("click", function() {
                searchInput.value = savedItemName.textContent;
                searchWeather();
            });
            savedLocationButtons.appendChild(searchSavedItem);

            const deleteSavedItemButton = document.createElement("button");
            deleteSavedItemButton.className = "saved-location-delete";
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "bi bi-trash3-fill";
            deleteSavedItemButton.appendChild(deleteIcon);
            // deleteSavedItemButton.addEventListener("click", (e) => {
            //     savedLocationsList.removeChild(savedItem);
            //     removeLocation(parsedRequiredUser.savedLocations[i].location);
            // });
            $(deleteSavedItemButton).on("click", function() {
                savedLocationsList.removeChild(savedItem);
                removeLocation(parsedRequiredUser.savedLocations[i].location);
            });
            savedLocationButtons.appendChild(deleteSavedItemButton);

            savedLocationsList.appendChild(savedItem);
        }
        for (let i = 0; i < parsedRequiredUser.searchHistory.length; i++){
            // Load search history items (list)
        }
    }
} else {
    let newUser = Object.assign({}, user);
    newUser.temperatureType = defaultTemperatureType;
    localStorage.setItem("user", JSON.stringify(newUser));
}

updateSavedLocationsCount();

const todayDate = document.querySelector(".today-date");
todayDate.innerHTML = "(" + moment().format('LL') + ")";

const infoBlock = document.querySelector('.info-block');
const historyBlock = document.querySelector('.history-block');
const mainPageButton = document.querySelector('.main-menu-btn');
const historyPageButton = document.querySelector('.history-menu-btn');

function showMainPage() {
    infoBlock.style.display = 'flex';
    historyBlock.style.display = 'none';
    mainPageButton.id = 'current-page';
    historyPageButton.id = '';
}

function showHistoryPage() {
    infoBlock.style.display = 'none';
    historyBlock.style.display = 'flex';
    mainPageButton.id = '';
    historyPageButton.id = 'current-page';
}

showHistoryPage();

function checkTime(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function searchWeather() {
    const APIKey = "584ca977c587314c7e2a79863cea8226";
    const tempCity = searchInput.value;

    const city = S(tempCity).capitalize().s;
    // const city = tempCity.charAt(0).toUpperCase() + tempCity.slice(1);

    if (tempCity === "") return;

    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&units=metric&appid=${APIKey}`
        )
        .then((response) => response.json())
        .then((json) => {
            if (json.cod === "404") {
                notFoundBlock.style.display = "flex";
                nothingBlock.style.display = "none";
                weatherBlock.style.display = "none";
                weatherBlock.style.opacity = 0;
                weatherBlock.style.scale = 0;
                return;
            }
            nothingBlock.style.display = "none";
            notFoundBlock.style.display = "none";
            weatherBlock.style.display = "flex";
            weatherBlock.style.opacity = 1;
            weatherBlock.style.scale = 1;

            const image = document.querySelector(".weather-mi img");
            const countryImage = document.querySelector(".weather-mi-footer img");

            image.ondragstart = () => {
                return false;
            };

            const description = document.querySelector(".description");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064276.png";
                    break;

                case "Rain":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064361.png";
                    break;

                case "Snow":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064317.png";
                    break;

                case "Clouds":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064269.png";
                    break;

                case "Haze":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064311.png";
                    break;

                case "Mist":
                    image.src = "https://cdn-icons-png.flaticon.com/512/4064/4064445.png";
                    break;

                default:
                    image.src = "";
            }
            const countryCode = String(json.sys.country);
            const countryFlagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
            countryImage.src = countryFlagURL;

            cityName.innerHTML = city;

            $(celsiumButton).on("click", function() {
                changeTemperatureType('C', json.main.temp);
            });
            $(fahrenheitButton).on("click", function() {
                changeTemperatureType('F', json.main.temp);
            });
            // celsiumButton.addEventListener("click", function() { changeTemperatureType('C', json.main.temp) });
            // fahrenheitButton.addEventListener("click", function() { changeTemperatureType('F', json.main.temp) });
            let requiredUser = localStorage.getItem('user');
            let parsedRequiredUser = JSON.parse(requiredUser);
            if (parsedRequiredUser.temperatureType === 'C') {
                changeTemperatureType('C', json.main.temp);
            } else if (parsedRequiredUser.temperatureType === 'F') {
                changeTemperatureType('F', json.main.temp);
            }

            humidity.innerHTML = `${json.main.humidity}<span> %</span>`;
            windSpeed.innerHTML = `${parseInt(json.wind.speed)}<span> km/h</span>`;
            let visibilityValue = json.visibility / 1000;
            visibility.innerHTML = `${visibilityValue}<span> km</span>`;
            cloudiness.innerHTML = `${json.clouds.all}<span> %</span>`;
            pressure.innerHTML = `${json.main.pressure}<span> hPa</span>`;

            const d1 = new Date();

            let hours = d1.getHours();
            let mins = d1.getMinutes();
            hours = checkTime(hours);
            mins = checkTime(mins);
            const currentDay = document.querySelector(".current-day");

            currentDay.innerHTML =
                moment().format('dddd') + ", " + `<span> ${moment().format('LT')}</span>`;

            const newDescription = json.weather[0].description;
            const changedDescription =
                newDescription.charAt(0).toUpperCase() + newDescription.slice(1);
            description.innerHTML =
                '<i class="fa-solid fa-cloud"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                changedDescription;

            console.log(json);
            console.log(json.sys.country);
            const saveButton = document.querySelector(".save-button");
            // saveButton.onClick = function() { saveLocation(cityName.textContent, json.sys.country) };
            $(saveButton).on("click", function() {
                saveLocation(cityName.textContent, json.sys.country);
            });

            const humidityItem = document.querySelector('.humidityItem');
            const windSpeedItem = document.querySelector('.windspeedItem');
            const visibilityItem = document.querySelector('.visibilityItem');
            const cloudinessItem = document.querySelector('.cloudinessItem');
            const pressureItem = document.querySelector('.pressureItem');

            $(humidityItem).on("click", function() {
                copyDetailsToClipboard(`Humidity in ${city} (${json.sys.country}) : ${json.main.humidity} %`, humidityItem);
            });
            $(windSpeedItem).on("click", function() {
                copyDetailsToClipboard(`Wind speed in ${city} (${json.sys.country}) : ${json.wind.speed} km/h`, windSpeedItem);
            });
            $(visibilityItem).on("click", function() {
                copyDetailsToClipboard(`Visibility in ${city} (${json.sys.country}) : ${visibilityValue} km`, windSpeedItem);
            });
            $(cloudinessItem).on("click", function() {
                copyDetailsToClipboard(`Cloudiness in ${city} (${json.sys.country}) : ${json.clouds.all} %`, cloudinessItem);
            });
            $(pressureItem).on("click", function() {
                copyDetailsToClipboard(`Pressure in ${city} (${json.sys.country}) : ${json.main.pressure} hPa`, pressureItem)
            });
            // humidityItem.addEventListener("click", function() { copyDetailsToClipboard(`Humidity in ${city} (${json.sys.country}) : ${json.main.humidity} %`, humidityItem) });
            // windSpeedItem.addEventListener("click", function() { copyDetailsToClipboard(`Wind speed in ${city} (${json.sys.country}) : ${json.wind.speed} km/h`, windSpeedItem) });
            // visibilityItem.addEventListener("click", function() { copyDetailsToClipboard(`Visibility in ${city} (${json.sys.country}) : ${visibilityValue} km`, visibilityItem) });
            // cloudinessItem.addEventListener("click", function() { copyDetailsToClipboard(`Cloudiness in ${city} (${json.sys.country}) : ${json.clouds.all} %`, cloudinessItem) });
            // pressureItem.addEventListener("click", function() { copyDetailsToClipboard(`Cloudiness in ${city} (${json.sys.country}) : ${json.main.pressure} hPa`, cloudinessItem) });

            //ADD HISTORY ITEM with parameters (time, locationName, country)
        });
}

$(search).on("click", function() {
    searchWeather();
});
$(clearSearch).on("click", function() {
    clearSearchInput();
});
// search.addEventListener("click", searchWeather);
// clearSearch.addEventListener("click", clearSearchInput);

const savedLocationsList = document.querySelector(".saved-locations-list");

function saveLocation(name, countryCode) {
    let requiredUser = localStorage.getItem('user');
    let parsedRequiredUser = JSON.parse(requiredUser);
    if (searchInput.value === "") return;

    if (parsedRequiredUser.savedLocations.length === 0) {
        const noneSavedItem = document.querySelector("#saved-location-none");
        noneSavedItem.style.display = "none";
    }
    if (parsedRequiredUser.savedLocations.length < 6) {
        let neededLocation = parsedRequiredUser.savedLocations.find(item => item.location === `${name}`);
        if (neededLocation === undefined) {
            const savedLocationsList = document.querySelector(".saved-locations-items");

            const savedItem = document.createElement("div");
            savedItem.className = "saved-locations-item";

            const savedItemName = document.createElement("p");
            savedItemName.className = "saved-locations-name";
            savedItemName.textContent = name;
            savedItem.appendChild(savedItemName);

            const savedItemFlag = document.createElement("img");
            const imgFullURL = document.querySelector(".weather-mi-footer img").src;
            savedItemFlag.src = imgFullURL;
            savedItem.appendChild(savedItemFlag);

            const savedLocationButtons = document.createElement("div");
            savedLocationButtons.className = "saved-locations-buttons";
            savedItem.appendChild(savedLocationButtons);

            const searchSavedItem = document.createElement("button");
            searchSavedItem.className = "saved-location-search";
            const searchIcon = document.createElement("i");
            searchIcon.className = "bi bi-search";
            searchSavedItem.appendChild(searchIcon);
            // searchSavedItem.addEventListener("click", (e) => {
            //     searchInput.value = savedItemName.textContent;
            //     searchWeather();
            // });
            $(searchSavedItem).on("click", function() {
                searchInput.value = savedItemName.textContent;
                searchWeather();
            });
            savedLocationButtons.appendChild(searchSavedItem);

            const deleteSavedItemButton = document.createElement("button");
            deleteSavedItemButton.className = "saved-location-delete";
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "bi bi-trash3-fill";
            deleteSavedItemButton.appendChild(deleteIcon);
            // deleteSavedItemButton.addEventListener("click", (e) => {
            //     savedLocationsList.removeChild(savedItem);
            //     //removeObjFromArray(parsedRequiredUser.savedLocations, `${city}`);
            //     // parsedRequiredUser.savedLocations = parsedRequiredUser.savedLocations.filter(item => item.location != city);
            //     // console.log("DELETING OBJ: " + parsedRequiredUser.savedLocations);
            //     // let neededLocation = parsedRequiredUser.savedLocations.find(item => item.location === `${name}`);
            //     // localStorage.setItem('user', JSON.stringify(parsedRequiredUser));
            //     // updateSavedLocationsCount();
            //     removeLocation(name);
            // });
            $(deleteSavedItemButton).on("click", function() {
                savedLocationsList.removeChild(savedItem);
                removeLocation(name);
            });
            savedLocationButtons.appendChild(deleteSavedItemButton);

            savedLocationsList.appendChild(savedItem);

            let locationOptions = Object.assign({}, savedLocationOption);
            locationOptions.location = name;
            locationOptions.country = countryCode;

            parsedRequiredUser.savedLocations.push(locationOptions);
            localStorage.setItem('user', JSON.stringify(parsedRequiredUser));

            updateSavedLocationsCount();

            $('.save-button').off("click");
        }
    }
}

function removeLocation(name) {
    let requiredUser = localStorage.getItem('user');
    let parsedRequiredUser = JSON.parse(requiredUser);
    let neededLocation = parsedRequiredUser.savedLocations.find(item => item.location === `${name}`);
    console.log("NEEDED OBJ: " + JSON.stringify(neededLocation))
    for (let i = 0; i < parsedRequiredUser.savedLocations.length; i++) {
        if (neededLocation.location === parsedRequiredUser.savedLocations[i].location) {
            parsedRequiredUser.savedLocations.splice(i, 1);
            localStorage.setItem('user', JSON.stringify(parsedRequiredUser));
            updateSavedLocationsCount();
            break;
        }
    }
    if (parsedRequiredUser.savedLocations.length === 0) {
        const noneSavedItem = document.querySelector("#saved-location-none");
        noneSavedItem.style.display = "flex";
    }

    // parsedRequiredUser.savedLocations = parsedRequiredUser.savedLocations.filter((a, i) => {
    //     if (name === a.location) {
    //         parsedRequiredUser.savedLocations.splice(i, 1);
    //     }
    // });
    // localStorage.setItem('user', JSON.stringify(parsedRequiredUser));
    // buttonObj.removeEventListener("click", removeLocation, true);
    // console.log(parsedRequiredUser);
}

function updateSavedLocationsCount() {
    const savedLocationsCountText = document.querySelector(
        "#saved-locations-title"
    );
    let requiredUser = localStorage.getItem('user');
    let parsedRequiredUser = JSON.parse(requiredUser);
    savedLocationsCountText.innerHTML = `<i class="bi bi-bookmarks-fill"></i>&nbsp;&nbsp;&nbsp;Saved Locations <span>(Count: ${parsedRequiredUser.savedLocations.length} / 6)</span> `;
}

function clearSearchInput() {
    searchInput.value = "";
    notFoundBlock.style.display = "none";
    nothingBlock.style.display = "flex";
    weatherBlock.style.display = "none";
    weatherBlock.style.opacity = 0;
    weatherBlock.style.scale = 0;
    humidity.innerHTML = "-<span> %</span>";
    windSpeed.innerHTML = "-<span> km/h</span>";
    visibility.innerHTML = "-<span> km</span>";
    cloudiness.innerHTML = "-<span> %</span>";
    pressure.innerHTML = "-<span> hPa</span>";

    // const saveButton = document.querySelector(".save-button");
    // saveButton.removeEventListener("click", saveLocation, true);
}

function changeTemperatureType(type, degrees) {
    const temperature = document.querySelector(".temperature");
    let requiredUser = localStorage.getItem('user');
    let parsedRequiredUser = JSON.parse(requiredUser);
    parsedRequiredUser.temperatureType = type;
    localStorage.setItem('user', JSON.stringify(parsedRequiredUser));
    switch (type) {
        case 'C':
            temperature.innerHTML = `${parseInt(degrees)}<span>°C</span>`;
            celsiumButton.id = "current-temp-type";
            fahrenheitButton.id = "";
            break;
        case 'F':
            const fahrenheit = ((degrees * 9) / 5) + 32;
            temperature.innerHTML = `${parseInt(fahrenheit)}<span>°F</span>`;
            celsiumButton.id = "";
            fahrenheitButton.id = "current-temp-type";
            break;
    }
}

function copyDetailsToClipboard(text, buttonObj) {
    navigator.clipboard.writeText("");
    navigator.clipboard.writeText(text + "\nSearch weather in your location: https://yabluninn.github.io/weath.io/");
    //alert("Weather details are copied!");
    const clipboardIcon = buttonObj.firstElementChild;
    clipboardIcon.className = "bi bi-clipboard-check";
    setTimeout(function() {
        clipboardIcon.className = "bi bi-clipboard-fill";
    }, 1500);
}

const logo = document.querySelector(".logo-block img");
logo.ondragstart = () => {
    return false;
};
