'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderWeather} from './weather.js';

renderInfo();
renderFood();
renderWeather();

const foodRefresh = window.setInterval(() => {
    renderFood();
}, 3600000);