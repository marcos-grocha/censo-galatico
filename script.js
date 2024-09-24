let result = document.getElementById('result')
let planetData = document.getElementById('planetData')

async function fetchPlanet() {
    let res = await fetch('https://swapi.dev/api/planets/')
    let {results} = await res.json()
    return results;
}

async function printPlanet() {
    let planets = await fetchPlanet();
    planets.forEach(planet => {
        console.log(planet.name)
        let button = document.createElement('button');
        button.innerHTML = planet.name;
        button.onclick = () => getPlanetData(planet);
        result.appendChild(button);
    });
};

async function searchPlanet() {
    let searchValue = document.getElementById('searchPlanet').value.toLowerCase();
    let planets = await fetchPlanet();
    planets.forEach(planet => {
        if (planet.name.toLowerCase().includes(searchValue.toLowerCase())) {
            getPlanetData(planet);
        }
    });
}

function getPlanetData(planet) {
    planetData.innerHTML = `
        <h3>Planeta: ${planet.name}</h3>
        <p><strong>Clima:</strong> ${planet.climate}</p>
        <p><strong>População:</strong> ${planet.population}</p>
        <p><strong>Terreno:</strong> ${planet.terrain}</p>
    `;
};

printPlanet()
