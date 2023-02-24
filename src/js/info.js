//kesken

import info from  '../assets/info.json';

const infoData = [];
for (let x in info) {
    infoData[x-1] = info[x].title;
}

export default Info;
