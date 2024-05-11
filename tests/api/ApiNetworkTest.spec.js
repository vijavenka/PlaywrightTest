const { test, expect, request } = require('@playwright/test')
const { ApiReqres } = require('../../utils/ApiReqres.spec')
const { ApiGorest } = require('../../utils/ApiGorest.spec')
const reqresPayload = {data:{id:3,name:"true red",year:2002,color:"#BF1932",pantone_value:"19-1664"},support:{url:"https://reqres.in/#support-heading",text:"To keep ReqRes free, contributions towards server costs are appreciated!"}}
const gorestPayload = {id:6900477,name:"Jacky",email:"Moshe92@hotmail.com",gender:"male",status:"active"}

let response
let apiReqres, apiGorest
let token = "Bearer 4ecdf17cb0bf8192cbcf31ec034b89cf41522c291746c87249a3da9e608f90f6"

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    apiReqres = new ApiReqres(apiContext, reqresPayload)
    apiGorest = new ApiGorest(apiContext, gorestPayload, token)
})

test('ApiReqres test', async ({ page }) => {
    await apiReqres.getCall()
    await apiReqres.putCall()
    await apiReqres.deleteCall()
    await apiReqres.postCall()
    await apiReqres.invalidApiCall()
})

test('ApiGorest test', async({page})=>{
    await apiGorest.getCall()
    await apiGorest.putCall()
    await apiGorest.postCall()
    // await apiGorest.deleteCall() //commented because it deletes the record, hence unable to execute remaining method
    await apiGorest.invalidApiCall()
})