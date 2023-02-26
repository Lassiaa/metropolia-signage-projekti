const coursesEn = [];
const coursesFi = [];

fetch('https://www.sodexo.fi/ruokalistat/output/daily_json/152/2023-01-30')
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));

const tulosta = (menu, order='asc') => {
    console.log(coursesEn);
    console.log(coursesFi);
};
console.log("123");

