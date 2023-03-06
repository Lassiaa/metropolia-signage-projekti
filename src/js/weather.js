'use strict';

let currentDate = new Date().toISOString().slice(0, 10)

const getWeather = async () => {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Espoo?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=CZHNM8Y6A7KAP5UQ6ZQ4WLTRX&options=beta&contentType=json`;
        const res = await fetch(url);
        console.log(res.ok);
        const data = await res.json();
        return (data);
    } catch (err) {
        console.error(err)
    }
};
const renderWeather = async () => {
    const tempDiv = document.querySelector('#weather-temp');
    const humidityDiv = document.querySelector('#weather-humidity');
    const windspeedDiv = document.querySelector('#weather-windspeed');
    const weatherDiv = document.querySelector('#weather-weather');
    tempDiv,humidityDiv,windspeedDiv,weatherDiv.innerHTML = " ";
    const d = new Date();
    let hour = d.getHours();
    const obj = await getWeather();
    console.log(obj)
    let temp = Math.round((obj.days[0].hours[hour].temp-32) / 1.8) / 1;
    let humidity = Math.round(obj.days[0].hours[hour].humidity) / 1;
    let windspeed = Math.round(obj.days[0].hours[hour].windspeed * 0.3048) / 1;
    let weather = obj.days[0].hours[hour].conditions;
    tempDiv.innerHTML = `${temp}°C`;
    humidityDiv.innerHTML = `💧 ${humidity}%`;
    windspeedDiv.innerHTML = `💨 ${windspeed}m/s`;
    weatherDiv.innerHTML = weather;
};

export {renderWeather};