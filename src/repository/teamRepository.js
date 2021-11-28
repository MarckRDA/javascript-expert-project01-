const Pokemon = require('../entity/pokemon')
const PokeApi = require('../pokeApi')
class TeamRepository {
    constructor(pokeApiInstance) {
        this.pokeApiInstance = pokeApiInstance
    }

    async getPokemon(url) {
        const result = await this.pokeApiInstance.makeRequest(url)
        const {
            id,
            name,
            moves: pokemonMoves
        } = result
        const moves = []

        for (let index = 0; index < 3; index++) {
            const move = pokemonMoves[index];
            const {
                move: {
                    name: moveName
                }
            } = move
            moves.push(moveName)
        }
        
        return new Pokemon(id, name, moves)
    }

    async getPokemons() {
        const pokemonList = []
        for await (let pokemonUrl of this.pokeApiInstance.getPokemonsUrl()) {
            const pokemon = await this.getPokemon(pokemonUrl)
            pokemonList.push(pokemon)
        }
        return pokemonList
    }

}

module.exports = TeamRepository