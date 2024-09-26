let planetData = document.getElementById('planetData')
let peopleData = document.getElementById('peopleData')
let allPlanets = document.getElementById('allPlanets')

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
        allPlanets.appendChild(button);
    });
};
async function searchPlanet() {
    let searchValue = document.getElementById('searchPlanet').value.toLowerCase();
    let planets = await fetchPlanet();
    planets.forEach(planet => {
        if (planet.name.toLowerCase().includes(searchValue)) {
            getPlanetData(planet);
        }
    });
}
function getPlanetData(planet) {
    planetData.innerHTML = `
        <h3>Planeta: ${planet.name}</h3>
        <p>
            <strong>Clima:</strong> ${planet.climate}<br>
            <strong>População:</strong> ${planet.population}<br>
            <strong>Terreno:</strong> ${planet.terrain}
        </p>
    `;
    peopleData.innerHTML = `
        <thead>
            <tr> <th colspan="2">Habitantes mais Famosos</th> </tr>
            <tr> <th>Nome</th> <th>Ano de Nascimento</th>  </tr>
        </thead>
    `;
    planet.residents.forEach(resident => { peopleApi(resident) });
};
async function peopleApi(resident) {
    let resposta = await fetch(resident)
    let people = await resposta.json()

    let tr = document.createElement('tr')
    tr.innerHTML = `
        <td>${people.name}</td>
        <td>${people.birth_year}</td>
    `;
    peopleData.appendChild(tr)
}
printPlanet()
console.log(fetchPlanet())