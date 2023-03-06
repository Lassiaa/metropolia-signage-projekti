'use strict';

let currentDate = new Date().toISOString().slice(0, 10)

const getWeather = async () => {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Espoo?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=CZHNM8Y6A7KAP5UQ6ZQ4WLTRX&options=beta&contentType=json`;
        const res = await fetch(url);
        console.log(res.ok);
        const data = await res.json();
        return (data);
    } catch (err) {
        console.error(err)
    }
};
const renderWeather = async () => {
    const d = new Date();
    let hour = d.getHours();
    let currenthour = `${hour}:00:00`;
    console.log(currenthour);

    const obj = await getWeather();
    console.log(obj)
    console.log(obj.days[0].hourstemp);

};

export {renderWeather};