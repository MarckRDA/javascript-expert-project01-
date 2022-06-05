const { describe, it, before } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const TeamService = require("../../src/service/teamService");

const mocks = {
  validPokemons: require("../mocks/valid-pokemons.json"),
};

describe("Suite teamService test", () => {
  let teamService = {};
  let sandbox = {};
  before(() => {
    teamService = new TeamService();
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("Should return a team Pokemon", async () => {
    sandbox.stub(teamService, teamService.getPokemonTeam.name).resolves(mocks.validPokemons)
    const expected = [
        { "name": "bulbasaur", "moves": ["razor-wind", "swords-dance", "cut"] },
        {
          "name": "charizard",
          "moves": ["mega-punch", "fire-punch", "thunder-punch"]
        },
        {
          "name": "charmander",
          "moves": ["mega-punch", "fire-punch", "thunder-punch"]
        }
      ]

    const result = await teamService.getPokemonTeam()
    expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result));
    sinon.reset();
  });
});
