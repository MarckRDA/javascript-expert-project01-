const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
const app = require('../../src/api')
const assert = require('assert')

describe('API Suite test', () => {
    describe('/team', () => {
        it('should request the /team route and return HTTP Status code 200', async () => {
            const response = await request(app)
                                        .get('/team')
                                        .expect(200)
                                        
            expect(response.statusCode).to.be.equal(200)
        })
    })
    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to default route and show a message', async() => {
            const response = await request(app)
                                        .get('/hi')
                                        .expect(200)
            assert.deepStrictEqual(response.text, "Access '/team' for getting a pokemon team")
        })
    })

})