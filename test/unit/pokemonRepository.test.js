const { describe, it, before } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const PokemonRepository = require("../../src/repository/pokemonRepository");

const BASE_URL_1 = "https://pokeapi.co/api/v2/pokemon/1";
const BASE_URLS_2 = [
  "https://pokeapi.co/api/v2/pokemon/1",
  "https://pokeapi.co/api/v2/pokemon/4",
  "https://pokeapi.co/api/v2/pokemon/6",
];

const mocks = {
  validRawBulbassaur: require("../mocks/valid-raw-bulbassaur.json"),
  validRawPokemons: require("../mocks/valid-raw-pokemons.json"),
};

describe("Suite pokemonRepository test", () => {
  let pokemonRepository = {};
  let sandbox = {};
  before(() => {
    pokemonRepository = new PokemonRepository();
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("Should return a unique valid Pokemon", async () => {
    sandbox.stub(pokemonRepository, "makeRequest").callsFake(function* () {
      yield mocks.validRawBulbassaur;
    });

    const expected = {
      name: "bulbasaur",
      moves: ["razor-wind", "swords-dance", "cut"],
    };

    const result = await pokemonRepository.getCharacter(BASE_URL_1);
    expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result));
    sinon.reset();
  });

  it("Should return a list of valid pokemons", async () => {
    sandbox
      .stub(pokemonRepository, "makeMultiplesRequest")
      .callsFake(function () {
        return mocks.validRawPokemons;
      });

    const expected = [
      {
        name: "charizard",
        moves: ["mega-punch", "fire-punch", "thunder-punch"],
      },
      { name: "bulbasaur", moves: ["razor-wind", "swords-dance", "cut"] },
      {
        name: "charmander",
        moves: ["mega-punch", "fire-punch", "thunder-punch"],
      },
    ];

    const result = await pokemonRepository.getCharacters(BASE_URLS_2);
    expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result));
    expect(expected.length).to.be.equal(result.length);
  });
});
