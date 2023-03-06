'use strict';

import {renderInfo} from './info.js';
import {renderFood} from './food.js';

renderInfo();
renderFood();

const infoRefresh = window.setInterval(() => {
    renderInfo();
}, 3600000);
