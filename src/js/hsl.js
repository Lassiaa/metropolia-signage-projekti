const getHslData = async () => {
    const query = `
        query {
            nearest(lat: 60.22420814321587, lon: 24.758717219253274, maxDistance: 500, filterByPlaceTypes: DEPARTURE_ROW) {
                edges {
                  node {
                    place {
                      ... on DepartureRow {
                        stop {
                          lat
                          lon
                          name
                        }
                        stoptimes {
                          serviceDay
                          scheduledDeparture
                          realtimeDeparture
                          trip {
                            route {
                              shortName
                              longName
                            }
                          }
                          headsign
                        }
                      }
                    }
                    distance
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
    let text = '';

    for (let i = 0; i < hslData.data.nearest.edges.length && i <= 5; i++) {
        if (hslData.data.nearest.edges[i].node.place.stoptimes.length > 0) {
            const distance = JSON.stringify(hslData.data.nearest.edges[i].node.distance + "m").replace(/"/g, '');
            const busStop = JSON.stringify(hslData.data.nearest.edges[i].node.place.stop.name).replace(/"/g, '');
            const busName = JSON.stringify(hslData.data.nearest.edges[i].node.place.stoptimes[0].headsign).replace(/"/g, '');
            const busNum = JSON.stringify(hslData.data.nearest.edges[i].node.place.stoptimes[0].trip.route.shortName).replace(/"/g, '');
            const busTime = JSON.stringify(hslData.data.nearest.edges[i].node.place.stoptimes[0].scheduledDeparture);

            // Converting seconds to hh mm ss
            const date = new Date(null);
            date.setSeconds(busTime); 
            const hhmmssFormat = date.toLocaleTimeString();
            const hhmmFormat = hhmmssFormat.substring(0, hhmmssFormat.length-3)

            text += `<li>` + busNum + ` ` + busName + ` ` + busStop + ` ` + distance + ` klo. ` + hhmmFormat + `</li><br>`;
        }
    }

    let container = document.querySelector('#hsl-data');
    container.innerHTML += text;
};

export { renderHslData };
