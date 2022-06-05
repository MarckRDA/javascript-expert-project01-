const PokemonRepository = require("../repository/pokemonRepository");

class TeamService {
    constructor() {
        this.pokemonRepository = new PokemonRepository()
    }

    async getPokemonTeam() {
        const urlPokemonRamdon = [
            `pokemon/${Math.floor(Math.random() * 10)}`,
            `pokemon/${Math.floor(Math.random() * 10)}`,
            `pokemon/${Math.floor(Math.random() * 10)}`
        ]
        return await this.pokemonRepository.getCharacters(urlPokemonRamdon)
    }
}

module.exports = TeamService