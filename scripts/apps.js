const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector("img.time");
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    //update HTML template in index.html
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    //sets the weather icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //sets the daytime/nighttime image
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //remove the d-none class if it's there
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return {
        cityDets: cityDets,
        weather: weather
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //gets the city value the user typed out
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});