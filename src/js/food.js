'use strict';

/**
 * 
 * @returns ruokalista-apin jsonin
 */
const getFood = async () => {
    try {
        const url = `https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl);
        console.log(res.ok);
        const data = await res.json();
        return (data);
    } catch (err) {
        console.error(err)
    }
};

/**
 * tulostaa ruokalistan "ruokalista"-osioon
 */
const renderFood = async () => {
    const food = await getFood();
    const foodContent = JSON.parse(food.contents);
    const menu = foodContent.MenusForDays[0].SetMenus;
    let text = '';

    for (let i in menu) {
        for (let j in menu[i].Components) {
            text += `<li>${menu[i].Components[j]}</li><br>`;
        }
    }

    let container = document.querySelector('#food-list');
    container.innerHTML += text;

    const date = new Date();
    let day = date.getDate();
    let monthText = date.toLocaleDateString('default', { month: 'long' });

    let title = document.querySelector('#food-title');
    title.innerHTML = `ruokalista tänään ${day}. ${monthText}ta`;
};

export { renderFood };
