'use strict';

let currentDate = new Date().toISOString().slice(0, 10)

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

const renderFood = async () => {
    let title = document.querySelector('#food-title');
    let food = document.querySelector('#food-list');
    //Tulostetaan ruokalista artikkelin otsikko, jossa näkyy päivämäärä.
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let monthText = date.toLocaleDateString('default', { month: 'long'});
    title.innerHTML = `Ruokalista tänään ${day}. ${monthText}ta`;
    food.innerHTML = '';
    food.title = '';
    let text = '';
    // Fetchataan ja tulostetaan sivulle päivän ruokalista.
    const obj = await getFood();
    const obj2 = JSON.parse(obj.contents);
    const ruokalista = obj2.MenusForDays[0].SetMenus;
    for(let i = 0; i < ruokalista.length; i++){
        for (let j = 0; j < ruokalista[i].Components.length; j++) {
        text += `<li>${ruokalista[i].Components[j]}</li><br>`;
        }
    }
    food.innerHTML += text;
};

export {renderFood};