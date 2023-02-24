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

const todayDate = document.querySelector(".today-date");
const d1 = new Date();
const month = d1.getMonth();
const day = d1.getDate();
let stringMonth = "";
switch (month) {
    case 0:
        stringMonth = "January";
        break;
    case 1:
        stringMonth = "February";
        break;
    case 2:
        stringMonth = "March";
        break;
    case 3:
        stringMonth = "April";
        break;
    case 4:
        stringMonth = "May";
        break;
}

todayDate.innerHTML = "(" + stringMonth + ", " + day + ")";

function checkTime(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function searchWeather() {
    const APIKey = "584ca977c587314c7e2a79863cea8226";
    const tempCity = searchInput.value;

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

            const city = tempCity.charAt(0).toUpperCase() + tempCity.slice(1);

            const image = document.querySelector(".weather-mi img");
            const countryImage = document.querySelector(".weather-mi-footer img");

            image.ondragstart = () => {
                return false;
            };

            const temperature = document.querySelector(".temperature");
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
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            humidity.innerHTML = `${json.main.humidity}<span> %</span>`;
            windSpeed.innerHTML = `${parseInt(json.wind.speed)}<span> km/h</span>`;
            let visibilityValue = json.visibility / 1000;
            visibility.innerHTML = `${visibilityValue}<span> km</span>`;
            cloudiness.innerHTML = `${json.clouds.all}<span> %</span>`;
            pressure.innerHTML = `${json.main.pressure}<span> hPa</span>`;

            const d1 = new Date();
            const day = d1.getDay();
            const days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ];

            let hours = d1.getHours();
            let mins = d1.getMinutes();
            hours = checkTime(hours);
            mins = checkTime(mins);
            const currentDay = document.querySelector(".current-day");
            currentDay.innerHTML =
                days[day - 1] + ", " + `<span> ${hours}:${mins}</span>`;

            const newDescription = json.weather[0].description;
            const changedDescription =
                newDescription.charAt(0).toUpperCase() + newDescription.slice(1);
            description.innerHTML =
                '<i class="fa-solid fa-cloud"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                changedDescription;

            console.log(json);
            console.log(json.sys.country);
        });
}

search.addEventListener("click", searchWeather);
clearSearch.addEventListener("click", clearSearchInput);
const saveButton = document.querySelector(".save-button");
saveButton.addEventListener("click", (e) => {
    saveLocation();
});

const savedLocationsList = document.querySelector(".saved-locations-list");

let savedLocationsCount = 0;

function saveLocation() {
    if (searchInput.value === "") return;

    if (savedLocationsCount === 0) {
        const noneSavedItem = document.querySelector("#saved-location-none");
        noneSavedItem.style.display = "none";
    }
    if (savedLocationsCount < 6) {
        const savedLocationsList = document.querySelector(".saved-locations-items");
        console.log("WORKIGN");
        const tempCity = searchInput.value;
        const city = tempCity.charAt(0).toUpperCase() + tempCity.slice(1);

        const savedItem = document.createElement("div");
        savedItem.className = "saved-locations-item";

        const savedItemName = document.createElement("p");
        savedItemName.className = "saved-locations-name";
        savedItemName.textContent = city;
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
        searchIcon.className = "fa-solid fa-magnifying-glass";
        searchSavedItem.appendChild(searchIcon);
        searchSavedItem.addEventListener("click", (e) => {
            searchInput.value = savedItemName.textContent;
            searchWeather();
        });
        savedLocationButtons.appendChild(searchSavedItem);

        const deleteSavedItemButton = document.createElement("button");
        deleteSavedItemButton.className = "saved-location-delete";
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash";
        deleteSavedItemButton.appendChild(deleteIcon);
        deleteSavedItemButton.addEventListener("click", (e) => {
            savedLocationsList.removeChild(savedItem);
            savedLocationsCount -= 1;
            updateSavedLocationsCount();
            if (savedLocationsCount === 0) {
                const noneSavedItem = document.querySelector("#saved-location-none");
                noneSavedItem.style.display = "flex";
            }
        });
        savedLocationButtons.appendChild(deleteSavedItemButton);

        savedLocationsList.appendChild(savedItem);

        savedLocationsCount += 1;
        updateSavedLocationsCount();
    }
}

function updateSavedLocationsCount() {
    const savedLocationsCountText = document.querySelector(
        "#saved-locations-title"
    );
    savedLocationsCountText.innerHTML = `<i class="fa-solid fa-bookmark"></i>&nbsp;&nbsp;&nbsp;Saved Locations <span>(Count: ${savedLocationsCount} / 6)</span> `;
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

    const saveButton = document.querySelector(".save-button");
    saveButton.removeEventListener("click", saveLocation, true);
}

const logo = document.querySelector(".logo-block img");
logo.ondragstart = () => {
    return false;
};