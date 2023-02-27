'use strict';

let currentDate = new Date().toISOString().slice(0, 10)


// async-funktoilla tehty:

/**
 * 
 * @returns ruokalistan sisällön apista
 */
async function getFood() {
  let url = `https://www.sodexo.fi/ruokalistat/output/daily_json/158/${currentDate}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * tulostaa ruokalistan sisällön "ruokalista"-osioon
 */
async function renderFood() {
  let food = await getFood();
  let html = '';

  for (let dish in food.courses) {
    let htmlSegment = `<li>
    ${food.courses[dish].title_fi}
    </li>`;

    html += htmlSegment;
  }

  let container = document.querySelector('#food');
  container.innerHTML += html;
}

renderFood();

// fetchillä tehty:

/*fetch(`https://www.sodexo.fi/ruokalistat/output/daily_json/158/${currentDate}`)
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
    
   let text;
   for (let i = 1;i < 5;i++){
    
        console.log(data.courses[i]);
      
        text += data.courses[i].title_fi;
   }
   foodContainer.innerHTML = text;
   /** 
    foodContainer.innerHTML = htmlSegment;
   
  })
  .catch(error => console.log(error));

const tulosta = (menu, order='asc') => {
    console.log(coursesEn);
    console.log(coursesFi);
};
 */
