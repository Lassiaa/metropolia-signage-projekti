'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();
renderWeather();
let s = false;
while(s == true){
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
// Get new menu and weather data every 50s
const dataRefresh = window.setInterval(() => {
    renderFood();
    renderWeather();
}, 50000);

// Get new info data every 50s
const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 50000);

// Get new HSL data every 5s
const hslRefresh = window.setInterval(() => {
    renderHslData();
}, 5000);
