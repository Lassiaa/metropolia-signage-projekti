'use strict';
const coursesEn = [];
const coursesFi = [];
let currentDate = '2023-02-22';
fetch(`https://www.sodexo.fi/ruokalistat/output/daily_json/158/${currentDate}`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data.courses[1].title_fi);
    let foodContainer = document.querySelector('#food');
    /** 
    data.courses.forEach(node => {
        let htmlSegment = `<li>
        ${node.title_fi}
        </li>`;
    })
    */
   let text;
   for (let i = 1;i < 5;i++){
    /** 
        console.log(data.courses[i]);
        */
        text += data.courses[i].title_fi;
   }
   foodContainer.innerHTML = text;
   /** 
    foodContainer.innerHTML = htmlSegment;
    */
  })
  .catch(error => console.log(error));

const tulosta = (menu, order='asc') => {
    console.log(coursesEn);
    console.log(coursesFi);
};
