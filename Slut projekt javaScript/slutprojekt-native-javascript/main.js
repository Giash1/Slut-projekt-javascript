import { fetchCharacters } from "./myModule.js";

// Global variables --------------------------------------------
const characterList = document.querySelector('.character-list')
const detailList = document.querySelector('ul.detail-list')
const detailListPlanet = document.querySelector('ul.detail-list-planet')
const btnCounterNeg = document.querySelector('.counter-neg')
const btnCounterPos = document.querySelector('.counter-pos')
const currentPageNumber = document.querySelector('.show-page-number')
let counter = 1


// VIEW --------------------------------------------------------

/**
 * Updates/deletes character list and render spinner while in promise.
 */
function loadCharacterListSpinners() {
    characterList.innerHTML = ""
    characterList.classList.add("loading")
}

/**
 * Updates/deletes character/planet attributes and render spinner while in promise.
 */
function loadCharacterAttributesSpinners() {
    detailListPlanet.classList.add('loading')
    detailList.classList.add('loading')
    detailList.innerHTML = ""
    detailListPlanet.innerHTML = ""
}

/**
 * Render character list
 */
async function renderCharacterList(data) {
    for (let character of data.results) {
        const btn = document.createElement('button')
        btn.innerText = `${character.name}`
        characterList.append(btn)
        renderCharacterAttributes(btn, character)
    }
    characterList.classList.remove("loading")
}

/**
 * Render character/planet attributes
 */
function renderCharacterAttributes(btn, character) {
    btn.addEventListener('click', async () => {
        loadCharacterAttributesSpinners()
        detailList.innerHTML = `
        <li>${character.name}</li>
         <li>Height: ${character.height}cm</li>
         <li>Mass: ${character.mass}kg</li>
         <li>Hair color: ${character.hair_color}</li> 
         <li>Skin color: ${character.skin_color}</li> 
         <li>Eye color: ${character.eye_color}</li> 
         <li>Birth year: ${character.birth_year}</li> 
         <li>Gender: ${character.gender}</li> 
        `
        detailList.classList.remove('loading')
        const responsePlanet = await fetch(`${character.homeworld}`)
        const data = await responsePlanet.json()
        detailListPlanet.innerHTML = `
        <li>${data.name}</li>
          <li>Rotation_period: ${data.rotation_period}</li> 
          <li>Orbital_period: ${data.orbital_period}</li> 
          <li>Diameter: ${data.diameter}</li>  
          <li>Climate: ${data.climate}</li>  
          <li>Gravity: ${data.gravity} </li> 
          <li>Terrain: ${data.terrain}</li>  
          `
        detailListPlanet.classList.remove('loading')
    })
}


// Controller ---------------------------------------------------

/**
 * Paginate character list and render page number-
 */
btnCounterNeg.addEventListener('click', async () => {
    loadCharacterListSpinners()
    counter--
    if (counter < 1) {
        counter = 1
    }
    const saveFetchedChar = await fetchCharacters(counter)
    currentPageNumber.innerHTML = `${counter} / ${Math.ceil(saveFetchedChar.count / 10)}`
    renderCharacterList(saveFetchedChar)
})

/**
 * Paginate character list and render page number+
 */
btnCounterPos.addEventListener('click', async () => {
    loadCharacterListSpinners()
    counter++
    if (counter > 9) {
        counter = 9
    }
    const saveFetchedChar = await fetchCharacters(counter)
    currentPageNumber.innerHTML = `${counter} / ${Math.ceil(saveFetchedChar.count / 10)}`
    renderCharacterList(saveFetchedChar)
})


// Application entry point ---------------------------------------
async function main() {
    const saveFetchedChar = await fetchCharacters(1)
    renderCharacterList(saveFetchedChar)
}
main()
