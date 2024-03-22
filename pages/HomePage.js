class HomePage {
    constructor(page){
        this.AdminButton            = page.locator('//span[text()="Admin"]')
        
        
    }
    async clickAdminButton(){
        await this.AdminButton.click();
    }
}export default HomePage