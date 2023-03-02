'use strict';

let currentDate = new Date().toISOString().slice(0, 10)

const getFood = async () => {
    try {
        const url = `https://www.sodexo.fi/ruokalistat/output/daily_json/158/${currentDate}`;
        const res = await fetch(url);
        console.log(res.ok);
        const data = await res.json();
        return (data);
    } catch (err) {
        console.error(err)
    }
};

getFood().then((data) => {

    let courses = data.courses;
    let size = Object.keys(courses).length;
    let html = "";
    let foodContainer = document.querySelector('#food');
    for (let i = 1; i <= size; i++) {
        html += `<li>${courses[i].title_fi}</li>`
    }
    foodContainer.innerHTML += html;
});

const renderFood = (menu, order = 'asc') => {
    console.log(coursesEn);
    console.log(coursesFi);
};

module.exports = {
    renderFood,
    
}