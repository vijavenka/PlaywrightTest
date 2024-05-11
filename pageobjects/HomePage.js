const { test, expect } = require('@playwright/test')

export class HomePage {

    constructor(page) {
        this.page = page
        this.welcomeAccept = page.locator("#onetrust-accept-btn-handler")
        this.hamburger = page.locator("span.css-62qso3 svg")
        this.polestar2Menu = page.locator("//span[contains(text(),'Polestar 2')]")
        this.polestar3Menu = page.locator("//span[contains(text(),'Polestar 3')]")
        this.discoverPolestar = page.locator("//span[contains(text(),'Discover Polestar 2')]")
    }

    async goto() {
        await this.page.goto("https://www.polestar.com/global/developer/get-started/")
    }

    async navigateToPolestar2() {
        await this.welcomeAccept.click()
        await this.hamburger.nth(0).click()
        await this.polestar2Menu.click()
        await this.discoverPolestar.click()
    }

    async navigateToPolestar3() {
        if(await this.welcomeAccept.isVisible()){
            await this.welcomeAccept.click()
        }
        await this.hamburger.nth(0).click()
        await this.polestar3Menu.click()
    }
}