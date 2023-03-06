'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';

renderInfo();
renderFood();

const foodRefresh = window.setInterval(() => {
    renderFood();
}, 3600000);
foodRefresh();