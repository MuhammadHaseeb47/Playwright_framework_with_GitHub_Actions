class CommonLocators {
    constructor(page){
        this.notification           = page.locator('(//div[@id="oxd-toaster_1"]//div)[5]')
        this.addButton              = page.locator('//button[contains(.,"Add")]')
        this.saveButton             = page.locator('//button[contains(.,"Save")]')
        this.stepperHeadingText     = page.locator('//div/h6')
        this.pageHeadingText        = page.locator('//h6/parent::span')
    }

    async clickAddButton(){
        await this.addButton.click()
    }

    async clickSaveButton(){
        await this.saveButton.click()
    }

    async clickTheField(field){
        await this.page.locator(`//label[contains(.,"${field}")]/parent::div/following-sibling::div//input`).click()
    }

    async typeIn(field,text){
        await this.page.locator(`//label[contains(.,"${field}")]/parent::div/following-sibling::div//input`).fill(text)
    }
}export default CommonLocators