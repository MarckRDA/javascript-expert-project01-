const SWapi = require('./../swapi')
class CharacterRepository {
    constructor() {
        this.makeRequest = SWapi.makeRequest
        this.makeMultiplesRequest = SWapi.makeMultiplesRequest
    }

    async getCharacter(urlResource) {
        let character = {}
        const response = (await this.makeRequest(urlResource).next()).value
        character = {
            name: response.name,
            birthDate: response.birth_year,
            starships: response.starships
        }
        return character
    }

    async getCharacters(urlResource) {
        const characters = []
        const {
            results
        } = (await this.makeRequest(urlResource).next()).value
        for (let index = 0; index < 3; index++) {
            const element = results[index]
            const character = {
                name: element.name,
                birthDate: element.birth_year,
                starships: element.starships
            }
            characters.push(character)
        }
        return characters
    }
}

// (async () => {
//     const c = new CharacterRepository()
//     console.log((await c.getCharacters('https://swapi.dev/api/people')))
// })()

module.exports = CharacterRepository