const {test, expect} = require('@playwright/test')
const { faker} = require('@faker-js/faker')
const { stat } = require('fs')

class ApiGorest {

    constructor(apiContext, gorestPayload, token){
        this.apiContext = apiContext
        this.gorestPayload = gorestPayload
        this.token = token
    }

    async getCall() {
        const response = await this.apiContext.get("https://gorest.co.in/public/v2/users/6900477", { 
        headers: { 'Authorization': this.token}})
        expect(await response.status()).toBe(200)
        expect(await response.ok()).toBeTruthy()
        const respBody = JSON.parse(await response.text())
        expect(respBody.id).toBe(6900477)
        expect(respBody.name).toBe("Jacky")
        expect(respBody.email).toBe("Moshe92@hotmail.com")
        expect(respBody.gender).toBe("male")
        expect(respBody.status).toBe("active")
    }

    async putCall() {
        const response = await this.apiContext.put("https://gorest.co.in/public/v2/users/6900477", {data: this.gorestPayload, 
        headers: { 'Authorization': this.token, 'Content-Type': 'application/json'}})
        expect(await response.status()).toBe(200)
        expect(await response.ok()).toBeTruthy()
        const respBody = JSON.parse(await response.text())
        expect(respBody.id).toBe(6900477)
        expect(respBody.name).toBe("Jacky")
        expect(respBody.email).toBe("Moshe92@hotmail.com")
        expect(respBody.gender).toBe("male")
        expect(respBody.status).toBe("active")
    }

    async postCall() {
        const name = faker.person.firstName()
        const email = faker.internet.email()
        const gorestPostPayload = {name:name,email:email,gender:"female",status:"active"}

        const response = await this.apiContext.post("https://gorest.co.in/public/v2/users", {data: gorestPostPayload, 
        headers: { 'Authorization': this.token, 'Content-Type': 'application/json'}})
        expect(await response.status()).toBe(201)
        expect(await response.ok()).toBeTruthy()
        const respBody = JSON.parse(await response.text())
        expect(respBody.id).not.toBeNull()
        expect(respBody.name).toBe(name)
        expect(respBody.email).toBe(email)
        expect(respBody.gender).toBe("female")
        expect(respBody.status).toBe("active")
    }

    async deleteCall() {
        const response =  await this.apiContext.delete("https://gorest.co.in/public/v2/users/6899951", { 
        headers: { 'Authorization': this.token, 'Content-Type': 'application/json'}})
        expect(await response.status()).toBe(204)
        expect(await response.ok()).toBeTruthy()
    }

    async invalidApiCall(){
        const iGetResponse = await this.apiContext.get("https://gorest.co.in/public/v2/users/6899951")
        expect(await iGetResponse.status()).toBe(404)
        expect(await iGetResponse.ok()).toBeFalsy()
        const respBodyGet = JSON.parse(await iGetResponse.text())
        expect(respBodyGet.message).toBe("Resource not found")
    
        const iPutResponse = await this.apiContext.put("https://gorest.co.in/public/v2/users/6899951", {data: this.gorestPayload, 
        headers: { 'Authorization': this.token, 'Content-Type': 'application/json'}})
        expect(await iPutResponse.status()).toBe(404)
        expect(await iPutResponse.ok()).toBeFalsy()
        const respBodyPut = JSON.parse(await iPutResponse.text())
        expect(respBodyPut.message).toBe("Resource not found")

        const iPostResponse = await this.apiContext.post("https://gorest.co.in/public/v2/users", {data: this.gorestPayload, 
        headers: { 'Authorization': this.token, 'Content-Type': 'application/json'}})
        expect(await iPostResponse.status()).toBe(422)
        expect(await iPostResponse.ok()).toBeFalsy()
        const respBodyPost = JSON.parse(await iPostResponse.text())
        expect(respBodyPost[0].field).toBe("email")
        expect(respBodyPost[0].message).toBe("has already been taken")

        const iDeleteRsponse =  await this.apiContext.delete("https://gorest.co.in/public/v2/users/6899951")
        expect(await iDeleteRsponse.status()).toBe(404)
        expect(await iDeleteRsponse.ok()).toBeFalsy()
    }
}
module.exports = {ApiGorest}
