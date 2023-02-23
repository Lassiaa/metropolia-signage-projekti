import {doFetch} from './network';

(async () => {
  // get sodexo data example (iife)
  try {
    const menuData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152'
    );
    console.log('myrtsin menu', menuData);
  } catch (error) {
    // tehdään jotain jos virhe doFethiltä
    console.log('menu ei saatavilla');
  }
  // get foodco menu
  try {
    const menuData = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en',
      true
    );
    console.log('karaportin menu', menuData);
  } catch (error) {
    // do something
  }
})();
