const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=44d613294c4750acdea8af2a55a55856';
const units = '&units=metric';
let city;
let url;


const getWeather = () => {
    city = (!input.value) ? 'Łęczna' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {

            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);
            
            
            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            if(status.id >= 200 && status.id <= 232) {
                photo.setAttribute('src', 'images/thunderstorm.png');
            } else if(status.id >= 300 && status.id <= 321) {
                photo.setAttribute('src', 'images/drizzle.png');
            } else if(status.id >= 500 && status.id <= 531) {
                photo.setAttribute('src', 'images/rain.png');
            } else if(status.id >= 600 && status.id <= 622) {
                photo.setAttribute('src', 'images/ice.png');
            } else if(status.id >= 701 && status.id <= 781) {
                photo.setAttribute('src', 'images/fog.png');
            } else if(status.id === 800) {
                photo.setAttribute('src', 'images/sun.png');
            } else if(status.id >= 801 && status.id <= 804) {
                photo.setAttribute('src', 'images/cloud.png');
            } else {
                photo.setAttribute('src', 'images/unknown.png');
            }

            warning.textContent = '';
            input.value = '';
        })
        .catch(() => warning.textContent = "Wpisz poprawną nazwę miasta");
};

const enterCheck = () => {
    if(event.code == 'Enter') {
        getWeather();
    }
}

getWeather();
input.addEventListener('keyup', enterCheck);
btn.addEventListener('click', getWeather);