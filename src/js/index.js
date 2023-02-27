'use strict';

let coursesEn = [];
let coursesFi = [];
let currentDate = new Date().toISOString().slice(0, 10)
/**
fetch(`https://www.sodexo.fi/ruokalistat/output/daily_json/158/${currentDate}`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data.courses[1].title_fi);
    let foodContainer = document.querySelector('#food');
    let text;
   for (let i = 1;i < 5;i++){
        coursesFi.push(data.courses[i].title_fi);
        coursesEn.pusj(data.courses[i].title_en)
   }
  })
  .catch(error => console.log(error));
*/

const getRuokaLista = async () => {
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

getRuokaLista().then((data) => {

  let courses = data.courses;
  let size = Object.keys(courses).length;
  let html = "";
  let foodContainer = document.querySelector('#food');
  for (let i = 1; i <= size; i++) {
    html += `<li>${courses[i].title_fi}</li>`
  }
  foodContainer.innerHTML += html;
});

const tulosta = (menu, order = 'asc') => {
  console.log(coursesEn);
  console.log(coursesFi);
};

// polku info.json-tiedostoon: '../src/assets/info.json'
/**
 * 
 * @returns json-tiedoston sisällön
 */
async function getInfo() {
  //let url = '../src/assets/info.json';
  let url = '../src/assets/info.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * tulostaa json-tiedoston sisällön "tiedotteet"-osioon
 */
async function renderInfo() {
  let info = await getInfo();
  let html = '';

  info.forEach(node => {
    let htmlSegment = `<li>
      ${node.title}
      </li>`;

    html += htmlSegment;
  });

  let container = document.querySelector('#info-list');
  container.innerHTML = html;
}

renderInfo();

