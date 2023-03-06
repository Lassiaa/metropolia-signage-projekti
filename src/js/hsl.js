'use strict';

const getHslData = async () => {
    const query = `
        query {
          stops(name: "Karanristi Karamalmens") {
            name
            code
            stoptimesWithoutPatterns(numberOfDepartures: 5) {
              realtimeArrival
              scheduledArrival
              arrivalDelay
              realtime
              realtimeState
              serviceDay
              headsign
              trip {
                  route {
                  shortName
                  longName
                }
              }
            }
          }
        }
    `;

    try {
        const apiUrl = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                query
            })
        })
        const data = res.json();
        return (data);
    } catch (err) {
        console.log(err);
    }
};

const renderHslData = async () => {
    const hslData = await getHslData();
    console.log(hslData);

    const hslArray = [];
    let text = '';

    let container = document.querySelector('#hsl-data');
    container.innerHTML = text;

    for (let stop = 0; stop < hslData.data.stops.length; stop++) {
        const busStopName = JSON.stringify(hslData.data.stops[stop].name).replace(/"/g, '');
        const busStopCode = JSON.stringify(hslData.data.stops[stop].code).replace(/"/g, '');

        for (let bus = 0; bus < hslData.data.stops[stop].stoptimesWithoutPatterns.length; bus++) {
          const busName = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].headsign).replace(/"/g, '');
          const busNum = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].trip.route.shortName).replace(/"/g, '');
          const busArrival = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].realtimeArrival);

          // Converting seconds to utc time and converting to desired format
          const dateUTC  = new Date(null);
          dateUTC .setUTCSeconds(busArrival); 
          const [dayOfTheWeek, date, month, year, hour, min, sec] = dateUTC.toUTCString().split(/:| /);
          const desiredTimeFormat = `${hour}:${min}`;

          hslArray.push('klo.' + desiredTimeFormat + ', ' + busStopName + ', ' + busStopCode + ', ' + busNum + ', ' + busName)

        }
    }

    hslArray.sort();

    for (let i = 0; i < hslArray.length && i < 5; i++) {
      text += `<li>` + hslArray[i] + `</li><br>`;
    }

    console.log(hslArray);

    container.innerHTML += text;
};

export { renderHslData };
