export async function fetchCharacters(counter) {
    let response = await fetch(`https://swapi.dev/api/people/?page=${counter}`)
    const data = await response.json()
    return data
}