const http = require('http')
const TeamService = require('./service/teamService')

const routes = {
    '/team:get': async (_, response) => {
        const teamInstance = new TeamService()
        const team = await teamInstance.getPokemonTeam()
        response.write(JSON.stringify(team))
        return response.end()
    },
    '/:get': (_, response) => {
        response.write("Access '/team' for getting a pokemon team" )
        return response.end()
    }
}

const handlerServer = (request, response) => {
    const {url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes['/:get']

    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request, response)
}

const app = http.createServer(handlerServer)
                                        .listen(3000, () => console.log('app running at http://localhost:3000/'))

module.exports = app