'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';
import {renderHslData} from './hsl.js';


renderInfo();
renderFood();
renderHslData();

// Get new HSL data every 30s
const hslRefresh = window.setInterval(() => {
    renderHslData();
}, 30000);