'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();

const foodRefresh = window.setInterval(() => {
    renderFood();
}, 50000);


const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 50000);
