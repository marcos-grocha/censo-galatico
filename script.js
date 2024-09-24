let result = document.getElementById('result')
let planetData = document.getElementById('planetData')

async function printPlanet() {
    let res = await fetch('https://swapi.dev/api/planets/')
    let {results} = await res.json()

    results.forEach(planet => {
        console.log(planet.name)
        let button = document.createElement('button');
        button.innerHTML = planet.name;
        button.onclick = () => getPlanetData(planet);
        result.appendChild(button);
    });
};

function getPlanetData(planet) {
    planetData.innerHTML = `
        <h3>Planeta: ${planet.name}</h3>
        <p><strong>Clima:</strong> ${planet.climate}</p>
        <p><strong>População:</strong> ${planet.population}</p>
        <p><strong>Terreno:</strong> ${planet.terrain}</p>
    `;
};

printPlanet()
