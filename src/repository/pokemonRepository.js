const PokeApi = require("./../pokeAPI");
class PokemonRepository {
  constructor() {
    this.makeRequest = PokeApi.makeRequest;
    this.makeMultiplesRequest = PokeApi.makeMultiplesRequest;
  }

  async getCharacter(url) {
    const { name, moves: pokemonRawMoves } = (
      await this.makeRequest(url).next()
    ).value;
    const moves = [];
    for (let index = 0; index < 3; index++) {
      moves.push(pokemonRawMoves[index].move.name);
    }
    return {
      name,
      moves,
    };
  }

  async getCharacters(urlList) {
    const rawPokemonsData = await this.makeMultiplesRequest(urlList);
    const pokemons = [];
    for (let index = 0; index < urlList.length; index++) {
      const { name, moves: pokemonRawMoves } = rawPokemonsData[index];
      const moves = [];
      for (let j = 0; j < 3; j++) {
        moves.push(pokemonRawMoves[j].move.name);
      }
      pokemons.push({
        name,
        moves,
      });
    }
    return pokemons;
  }
}

module.exports = PokemonRepository;
