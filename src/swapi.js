const https = require('https')
const BASE_URL = 'https://swapi.dev/api/'
class SWapi {
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
    for (let i = 0; i < resourcesUrlList.length; i++) {
      for await (const item of SWapi.makeRequest(resourcesUrlList[i])) {
        responseList.push(item)
      }
    }
    return responseList
  }
}

module.exports = SWapi
