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

    const monthsFi = ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'];

    let title = document.querySelector('#food-title');
    let foodList = document.querySelector('#food-list');
    //Tulostetaan ruokalista artikkelin otsikko, jossa näkyy päivämäärä.
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let monthText = monthsFi[month];
    title.innerHTML = `ruokalista tänään ${day}. ${monthText}ta`;
    foodList.innerHTML = '';
    foodList.title = '';
    let text = '';
    // Fetchataan ja tulostetaan sivulle päivän ruokalista.
    const food = await getFood();
    const foodContent = JSON.parse(food.contents);
    const menu = foodContent.MenusForDays[0].SetMenus;
    for(let i = 0; i < menu.length; i++){
        for (let j = 0; j < menu[i].Components.length; j++) {
        text += `<li>${menu[i].Components[j]}</li><br>`;
        }
    }
    foodList.innerHTML += text;
};

export {renderFood};