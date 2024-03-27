class HomePage {
    constructor(page){
        this.AdminButton            = page.locator('//span[text()="Admin"]')
        this.pimButton              = page.locator('//span[text()="PIM"]')
        this.usernameText           = page.locator('//ul/li/span/p')
    }
    async clickAdminButton(){
        await this.AdminButton.click();
    }

    async clickPimButton(){
        await this.pimButton.click();
    }

    async extractUsernameText(){
        let text = await this.usernameText.textContent()
        console.log(text)
        return text;
    }
}export default HomePage