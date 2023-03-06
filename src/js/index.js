'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();
renderWeather();

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
