'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();
renderWeather();
//Varmistetaan että kaikki api fetchit menee läpi ja tulostuu sivulle
let s = false;
let counter = 0;
let container = document.querySelector('#hsl-data');
let fcontainer = document.querySelector('#food-list');
let wcontainer = document.querySelector('#weather-temp');
let icontainer = document.querySelector('#info-carousel');
while(s !== true){
    counter++;
    if (container.innerHTML == ""){
        await renderHslData();
    }
    if (fcontainer.innerHTML == ""){
        await renderFood();
    }
    if (wcontainer.innerHTML == ""){
        await renderWeather();
    }
    if (icontainer.innerHTML == ""){
        await renderInfo();
    }
    if (container.innerHTML !== "" && fcontainer.innerHTML !== "" && wcontainer.innerHTML !== "" && icontainer.innerHTML !== ""){
        s = true;
    }
    if (counter == 100){
        s = true;
    }
}

// Get new menu and weather data every 1h
const dataRefresh = window.setInterval(() => {
    renderFood();
    renderWeather();
}, 6000000);

// Get new info data every 1h
const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 6000000);

// Get new HSL data every 30s
const hslRefresh = window.setInterval(() => {
    renderHslData();
}, 30000);
