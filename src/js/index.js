'use strict';

// polku info.json-tiedostoon: '../src/assets/info.json'

async function getInfo() {
  let url = '../src/assets/info.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

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
