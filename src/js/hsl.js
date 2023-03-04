'use strict';

const showHSLData = () => {
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

    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);

        let html = "Testi";
        let hslDataContainer = document.querySelector('#hsl-data');

        hslDataContainer.innerHTML += html;
        
    });
};

export {renderHsl};