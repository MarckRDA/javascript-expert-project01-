const https = require('https')
const BASE_URL = "https://pokeapi.co/api/v2/"
class PokeApi {
    async makeRequest(resourceUrl) {
        const url = BASE_URL + resourceUrl
        const rawData = []
        return new Promise((resolve, reject) => {
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
    async getPokemonsUrl() {
        const {results} = await this.makeRequest('pokemon')
        const urlList = []
        results.forEach(item => {
            urlList.push(item.url)
        })
        return urlList
    }
}

module.exports = PokeApi