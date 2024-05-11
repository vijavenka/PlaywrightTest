import { test, chromium } from '@playwright/test'
import { HomePage } from '../../pageobjects/HomePage'
import { ExploreCar } from '../../pageobjects/ExploreCar'

let home, exploreCar
test.describe('Polestar', async () => {

    let page, context, browser
    test.beforeAll(async () => {
        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()
        home = new HomePage(page)
        exploreCar = new ExploreCar(page)
    })

    test.beforeEach(async () => {
        await home.goto()
    })

    test('navigate to Polestar2', async () => {
        const exteriorData = ["Design", "Colours", "Wheels", "Headlights", "Adaptive rear light-blade ", "Door mirrors"]
        await home.navigateToPolestar2()
        await exploreCar.exploreExterior(exteriorData)
    })

    test('navigate to Polestar3', async () => {
        const exteriorData = ["Exterior design explained", "Colours", "Optimised airflow", "Headlights", "Rear light bar", "Door mirrors", "Wheels"]
        await home.navigateToPolestar3()
        await exploreCar.exploreExterior(exteriorData)
    })
})