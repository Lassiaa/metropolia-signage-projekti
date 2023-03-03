// polku info.json-tiedostoon: '../src/assets/info.json'
/**
 * 
 * @returns json-tiedoston sisällön
 */
async function getInfo() {
    //let url = '../src/assets/info.json';
    //let url = '../src/assets/info.json';
    let url = 'https://users.metropolia.fi/~onnif/info.json';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`

    try {
        let res = await fetch(proxyUrl);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

/**
 * tulostaa json-tiedoston sisällön "tiedotteet"-osioon
 */
async function renderInfo() {
    let info = await getInfo();
    let html = '';

    const infoText = JSON.parse(info.contents);

    for (let i in infoText) {
        /*
        let htmlSegment = `<li>
        ${infoText[i].title}
        </li>`;
        */

        let htmlSegment = ` <div class="carousel-item">
        <div class="container info-card">
            <h3>${infoText[i].title}</h3>
            <p>${infoText[i].text}</p>
        </div>
    </div>`

        html += htmlSegment;
    }

    let container = document.querySelector('#info-carousel');
    container.innerHTML += html;
}

export {renderInfo};