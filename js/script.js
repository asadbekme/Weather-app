const api = {
    key: '8ec9fb4568d983318c8480c8be364646',
    baseURL: 'https://api.openweathermap.org/data/2.5/'
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery)

function setQuery(e) {
    getResults(searchBox.value);
    if (e.keyCode === 13) {
        console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temperature .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;

    let weather_el = document.querySelector('.temperature .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.temperature .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(a) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[a.getDay()];
    let date = a.getDate();
    let month = months[a.getMonth()];
    let year = a.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}