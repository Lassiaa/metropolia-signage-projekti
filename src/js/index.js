'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();

// Get new menu data every 50s
const foodRefresh = window.setInterval(() => {
    renderFood();
}, 50000);

// Get new info data every 50s
const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 50000);


// Get new HSL data every 30s
const hslRefresh = window.setInterval(() => {
    renderHslData();
}, 30000);
