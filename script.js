let planetData = document.getElementById('planetData')
let peopleData = document.getElementById('peopleData')
let allPlanets = document.getElementById('allPlanets')

async function fetchPlanet() {
    try {
        let res = await fetch('https://swapi.dev/api/planets/')
        let {results} = await res.json()
        return results;
    } catch (error) {
        console.error("Erro ao buscar planetas:", error);
        return [];
    }
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
    // Adiciona animação pulse
    planetData.classList.add('pulse');
    
    // Formata dados do planeta
    let population = planet.population;
    if (population !== "unknown" && !isNaN(population)) {
        population = parseInt(population).toLocaleString();
    }
    
    planetData.innerHTML = `
        <h3>Planeta: ${planet.name}</h3>
        <p>
            <strong>Clima:</strong> ${planet.climate}<br>
            <strong>População:</strong> ${population}<br>
            <strong>Terreno:</strong> ${planet.terrain}<br>
            <strong>Diâmetro:</strong> ${planet.diameter} km
        </p>
    `;
    
    peopleData.innerHTML = `
        <thead>
            <tr><th colspan="2">Habitantes mais Famosos</th></tr>
            <tr><th>Nome</th><th>Ano de Nascimento</th></tr>
        </thead>
    `;
    
    // Mostra loading enquanto carrega os residentes
    showLoading(true);
    
    // Verifica se há residentes
    if (planet.residents.length === 0) {
        peopleData.innerHTML += `
            <tr><td colspan="2" style="text-align:center;">Não há habitantes famosos registrados</td></tr>
        `;
        showLoading(false);
    } else {
        planet.residents.forEach(resident => { peopleApi(resident) });
    }
    
    // Remove animação pulse após um tempo
    setTimeout(() => {
        planetData.classList.remove('pulse');
    }, 2000);
}
async function peopleApi(resident) {
    try {
        showLoading(true);
        let resposta = await fetch(resident)
        let people = await resposta.json()

        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${people.name}</td>
            <td>${people.birth_year}</td>
        `;
        peopleData.appendChild(tr)
    } catch (error) {
        console.error("Erro ao buscar residente:", error);
    } finally {
        showLoading(false);
    }
}
function showLoading(show) {
    // Função para mostrar/esconder o loading
    const loadingContainer = document.getElementById('loadingContainer');
    if (loadingContainer) {
        loadingContainer.style.display = show ? 'block' : 'none';
    }
}
document.getElementById('searchPlanet').addEventListener('keypress', function(e) {
    // Evento para buscar ao pressionar Enter
    if (e.key === 'Enter') {
        searchPlanet();
    }
});

printPlanet()
console.log(fetchPlanet())