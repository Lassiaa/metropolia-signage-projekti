'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();
renderWeather();

const dataRefresh = window.setInterval(() => {
    renderFood();
    renderWeather();
}, 50000);

const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 50000);
