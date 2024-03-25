class HomePage {
    constructor(page){
        this.AdminButton            = page.locator('//span[text()="Admin"]')
        this.pimButton              = page.locator('//span[text()="PIM"]')
        
        
    }
    async clickAdminButton(){
        await this.AdminButton.click();
    }

    async clickPimButton(){
        await this.pimButton.click();
    }
}export default HomePage