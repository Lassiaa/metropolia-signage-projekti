'use strict';

/**
 * Retrieves  data from HSL API with GraphQL query
 * Converts it into json data
 * @returns json data from HSL API
 */
const getHslData = async () => {
    // GraphQL query
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

    // Make the connection to HSL API and get data as json
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

/**
 * Get the bus schedules for every stop from the json data
 * Send the data to array so all stops are in one place
 * Sort the array by busses arrival time
 * Send 6 first bus schedules to index.html
 */
const renderHslData = async () => {
    const hslData = await getHslData();
    const hslArray = [];
    const enoughTimeArray = [];
    let text = '';

    // Clear old data from page
    let container = document.querySelector('#hsl-data');
    container.innerHTML = text;

    //Go thru stops
    for (let stop = 0; stop < hslData.data.stops.length; stop++) {
        const busStopName = JSON.stringify(hslData.data.stops[stop].name).replace(/"/g, '');
        const busStopCode = JSON.stringify(hslData.data.stops[stop].code).replace(/"/g, '');

        //Go thru busses within stops
        for (let bus = 0; bus < hslData.data.stops[stop].stoptimesWithoutPatterns.length; bus++) {
            const busName = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].headsign).replace(/"/g, '');
            const busNum = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].trip.route.shortName).replace(/"/g, '');
            const busArrival = JSON.stringify(hslData.data.stops[stop].stoptimesWithoutPatterns[bus].realtimeArrival);

            // Get current time in seconds since midnight
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const seconds = Math.floor((now - midnight) / 1000);    

            // Arrivaltime is in seconds so convert it to utc time and desired format
            const dateUTC  = new Date(null);
            dateUTC .setUTCSeconds(busArrival); 
            const [dayOfTheWeek, date, month, year, hour, min, sec] = dateUTC.toUTCString().split(/:| /);
            const desiredTimeFormat = `${hour}:${min}`;

            hslArray.push(desiredTimeFormat + `<br>` + '<strong>Bussi: </strong>' + busNum + ', ' + busName + `<br>` + '<strong>Pysäkki: </strong>' + busStopCode + ', ' + busStopName);

            // Don't show busses that are coming in under 4 minutes so user has time to walk to the stop
            if (Math.abs(seconds - busArrival) > 240) {
              enoughTimeArray.push(desiredTimeFormat + `<br>` + '<strong>Bussi: </strong>' + busNum + ', ' + busName + `<br>` + '<strong>Pysäkki: </strong>' + busStopCode + ', ' + busStopName);
            }
        }
    }
    hslArray.sort();
    enoughTimeArray.sort();

    for (let i = 0; i < enoughTimeArray.length && i < 6; i++) {
        text += `<li>` + '<strong>klo.</strong>' + enoughTimeArray[i] + `</li><br>`;
    }
    container.innerHTML += text;
};

export { renderHslData };
