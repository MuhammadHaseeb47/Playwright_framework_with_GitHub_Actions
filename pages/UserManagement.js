class UserManagement{
    constructor(page){
        this.page=page
        this.addButton              = page.locator('//h5[text()="System Users"]/ancestor::div//button[text()=" Add "]')
        this.userRole               = page.locator('//label[text()="User Role"]/parent::div/following-sibling::div//i')
        this.employeeName           = page.locator('//label[text()="Employee Name"]/parent::div/following-sibling::div//input')
        this.status                 = page.locator('//label[text()="Status"]/parent::div/following-sibling::div//i')
        this.saveButton             = page.locator('//button[contains(.,"Save")]')
        this.ESSButton              = page.locator('//div[contains(span,"ESS")]')
        this.enabledStatus          = page.locator('//div[contains(span,"Enabled")]')
    }

    async usernameAndPassword(text){
        await this.page.locator(`//label[text()="${text}"]/parent::div/following-sibling::div//input`)
    }

    async addUserInfo(username,password){
        await this.addButton.click()
        await this.userRole.click()
        await this.ESSButton.click()
        await this.employeeName.fill('a')
        // await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.status.click()
        // await this.enabledStatus.click()
        // await this.usernameAndPassword('username').fill(username)
        // await this.usernameAndPassword('password').fill(password)
        // await this.usernameAndPassword('password').fill(password)
        await this.saveButton.click()
    }
}export default UserManagement