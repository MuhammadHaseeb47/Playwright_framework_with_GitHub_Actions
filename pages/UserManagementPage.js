class UserManagementPage{
    constructor(page){
        this.page=page
        this.addButton              = page.locator('//h5[text()="System Users"]/ancestor::div//button[text()=" Add "]')
        this.userRole               = page.locator('//label[text()="User Role"]/parent::div/following-sibling::div//i')
        this.employeeName           = page.locator('//label[text()="Employee Name"]/parent::div/following-sibling::div//input')
        this.status                 = page.locator('//label[text()="Status"]/parent::div/following-sibling::div//i')
        this.saveButton             = page.locator('//button[contains(.,"Save")]')
        this.ESSButton              = page.locator('//div[contains(span,"ESS")]')
        this.enabledStatus          = page.locator('//div[contains(span,"Enabled")]')
        this.username               = page.locator(`//label[text()="Username"]/parent::div/following-sibling::div//input`)
        this.password               = page.locator(`//label[text()="Password"]/parent::div/following-sibling::div//input`)
        this.confirmPassword        = page.locator(`//label[text()="Confirm Password"]/parent::div/following-sibling::div//input`)
        this.enabledRadioButton     = page.locator('//label[text()="Enabled"]//input')
    }

    async addUserInfo(employee){
        await this.addButton.click()
        await this.userRole.click()
        await this.ESSButton.click()
        await this.employeeName.fill(employee)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.status.click()
        await this.enabledStatus.click()
    }

    async addLoginInfo(user, pass){
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.confirmPassword.fill(pass)
    }
}module.exports = {UserManagementPage};