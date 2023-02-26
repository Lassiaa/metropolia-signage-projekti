/** 
const coursesEn = [];
const coursesFi = [];
import {doFetch} from './network';

(async () => {
  // get sodexo data example (iife)
  try {
    const menuData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/daily_json/152/2023-01-30'
    );
    for(let x in menuData.courses){
        coursesFi[x-1] = (menuData.courses[x].title_fi);
        coursesEn[x-1] = (menuData.courses[x].title_en);
    }
  } catch (error) {
    // tehdään jotain jos virhe doFetchiltä
    console.log('menu ei saatavilla');
  }
});

const tulosta = (menu, order='asc') => {
    console.log(coursesEn);
    console.log(coursesFi);
};
export {
    tulosta,
}
*/