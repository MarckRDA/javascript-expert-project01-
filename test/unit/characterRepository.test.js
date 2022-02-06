const {
    describe,
    it,
    before
} = require('mocha')
const sinon = require('sinon')
const {
    expect
} = require('chai')
const CharacterRepository = require('./../../src/repository/characterRepository')

const BASE_URL_1 = 'https://swapi.dev/api/people/1'
const BASE_URL_2 = 'https://swapi.dev/api/people'

const mocks = {
    validRawCharacter: require('./../mocks/valid-raw-character-data.json'),
    validRawCharacters: require('./../mocks/valid-raw-characters-data.json')
}

describe('Suite characterRepository test', () => {
    let characterRepository = {}
    let sandbox = {}
    before(() => {
        characterRepository = new CharacterRepository()
        sandbox = sinon.createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })
      it('Should return a unique valid star wars character', async () => {
        sandbox.stub(
          characterRepository,
          'makeRequest'
        ).callsFake(function * () {
          yield mocks.validRawCharacter
        })

        const expected = {
          name: 'Luke Skywalker',
          birthDate: '19BBY',
          starships: [
            'https://swapi.dev/api/starships/12/',
            'https://swapi.dev/api/starships/22/'
          ]
        }

        const result = await characterRepository.getCharacter(BASE_URL_1)
        expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result))
        sinon.reset()
      })

    it('Should return a list of valid star wars characters', async () => {
        sandbox.stub(
            characterRepository,
            'makeRequest'
        ).callsFake(function* () {
            yield mocks.validRawCharacters
        })

        const expected = [{
                name: 'Luke Skywalker',
                birthDate: '19BBY',
                starships: [
                    'https://swapi.dev/api/starships/12/',
                    'https://swapi.dev/api/starships/22/'
                ]
            },
            {
                name: 'C-3PO',
                birthDate: '112BBY',
                starships: []
            },
            {
                name: 'R2-D2',
                birthDate: '33BBY',
                starships: []
            }
        ]

        const result = await characterRepository.getCharacters(BASE_URL_2)
        expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result))
        expect(expected.length).to.be.equal(result.length)
    })
})