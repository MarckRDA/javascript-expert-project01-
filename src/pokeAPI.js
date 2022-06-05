const https = require('https')
const BASE_URL = 'https://pokeapi.co/api/v2/'
class PokeApi {
  static async * makeRequest (resourceUrl) {
    const url = resourceUrl.startsWith('https') ? resourceUrl : BASE_URL + resourceUrl
    const rawData = []

    yield new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', chunk => {
          rawData.push(chunk)
        })
        response.on('error', reject)
        response.on('end', () => {
          const data = Buffer.concat(rawData)
          resolve(JSON.parse(data))
        })
      })
    })
  }

  static async makeMultiplesRequest (resourcesUrlList) {
    const responseList = []
    await Promise.all(resourcesUrlList.map(async (url) => {
      const pokemon = (await PokeApi.makeRequest(url).next()).value
      responseList.push(pokemon)
    }))
    return responseList
  }
}

module.exports = PokeApi
