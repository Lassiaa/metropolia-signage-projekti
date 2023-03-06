'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';

renderInfo();
renderFood();
renderWeather();

const dataRefresh = window.setInterval(() => {
    renderFood();
    renderWeather();
}, 3600000);