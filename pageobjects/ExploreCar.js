const { expect } = require('@playwright/test')

export class ExploreCar {

    constructor(page) {
        this.page = page
        this.exploreTheCar = page.locator("//span[contains(text(),'Explore the car')]")
        this.exteriorHeader = page.locator("//span[contains(text(),'Exterior')]")
        this.exteriorMenu = page.locator("ul.css-0 li a")
    }

    async exploreExterior(exteriorData) {
        await this.exploreTheCar.click()
        await this.exteriorHeader.nth(1).isVisible()
        const count = await this.exteriorMenu.count()
        for (let i = 0; i < count; i++) {
            expect(this.exteriorMenu.nth(i)).toHaveText(exteriorData[i])
        }
    }
}