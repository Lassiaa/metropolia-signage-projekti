'use strict';

const info = ['moi täs tiedote',
  'toinen tiedote',
  'testi',
  'toimiiks tää',
];

const render = (target) => {
  const infoList = document.querySelector('#info-list');
  for (const i of target) {
    console.log(i);
    const li = document.createElement('li');
    li.textContent = i;
    infoList.append(li);
  }
};

render(info);
