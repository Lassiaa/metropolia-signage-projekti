'use strict';

let currentDate = new Date().toISOString().slice(0, 10)

const getFood = async () => {
    try {
        const url = `https://www.compass-group.fi/menuapi/week-menus?costCenter=3208&date=${currentDate}T16%3A08%3A11.953Z&language=fi`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl);
        console.log(res.ok);
        const data = await res.json();
        console.log(data)
        return (data);
    } catch (err) {
        console.error(err)
    }
};

const renderFood = async () => {
    // päivämääräjutut
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let monthText = date.toLocaleDateString('default', { month: 'long'});

    let food = await getFood();
    // food.contents on PIHVI
    console.log(food.contents);


    // TÄHÄN ruokalistan tulostaminen ruokalista-osioon


    // ruoka-osion otsikko
    let title = document.querySelector('#food-title');
    title.innerHTML = `ruokalista tänään ${day}. ${monthText}ta`;
};

export {renderFood};