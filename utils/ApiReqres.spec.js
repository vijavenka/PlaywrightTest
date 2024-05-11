const { expect } = require("@playwright/test")

class ApiReqres {

    constructor(apiContext, reqresPayload) {
        this.apiContext = apiContext    
        this.reqresPayload = reqresPayload
    }

    async getCall() {
        const getResponse = await this.apiContext.get('https://reqres.in/api/products/3')
        expect(await getResponse.status()).toBe(200)
        expect(await getResponse.ok()).toBeTruthy()
        const respBody = JSON.parse(await getResponse.text())
        expect(respBody.data.id).toBe(3)
        expect(respBody.data.name).toBe("true red")
        expect(respBody.data.year).toBe(2002)
        expect(respBody.data.color).toBe("#BF1932")
        expect(respBody.data.pantone_value).toBe("19-1664")
        expect(respBody.support.url).toBe("https://reqres.in/#support-heading")
        expect(respBody.support.text).toBe("To keep ReqRes free, contributions towards server costs are appreciated!")
    }

    async putCall() {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        
        const putResponse = await this.apiContext.put("https://reqres.in/api/products/3", {data: this.reqresPayload, headers: {'Content-Type': 'application/json'}})
        expect(await putResponse.status()).toBe(200)
        expect(await putResponse.ok()).toBeTruthy()
        const respBody = JSON.parse(await putResponse.text())
        expect(respBody.updatedAt).toContain(currentYear.toString())
    }

    async deleteCall() {
        const deleteResponse =  await this.apiContext.delete("https://reqres.in/api/products/3")
        expect(await deleteResponse.status()).toBe(204)
        expect(await deleteResponse.ok()).toBeTruthy()
    }

    async postCall() {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();

        const postResponse =  await this.apiContext.post("https://reqres.in/api/users", {data: this.reqresPayload, headers: {'Content-Type': 'application/json'}})
        expect(await postResponse.status()).toBe(201)
        expect(await postResponse.ok()).toBeTruthy()
        const respBody = JSON.parse(await postResponse.text())
        expect(respBody.id).toBeTruthy()
        expect(respBody.createdAt).toContain(currentYear.toString())
    }

    async invalidApiCall(){
        const iGetResponse =  await this.apiContext.get("https://reqres.in/api/products/13")
        expect(await iGetResponse.status()).toBe(404)
        expect(await iGetResponse.ok()).toBeFalsy()

        const iPutResponse =  await this.apiContext.put("https://reqres.in/api")
        expect(await iPutResponse.status()).toBe(404)
        expect(await iPutResponse.ok()).toBeFalsy()

        const iPostResponse =  await this.apiContext.post("https://reqres.in/api")
        expect(await iPostResponse.status()).toBe(404)
        expect(await iPostResponse.ok()).toBeFalsy()

        const iDeleteResponse =  await this.apiContext.delete("https://reqres.in/api")
        expect(await iDeleteResponse.status()).toBe(404)
        expect(await iDeleteResponse.ok()).toBeFalsy()
    }
}
module.exports = { ApiReqres }