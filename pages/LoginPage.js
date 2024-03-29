class LoginPage{
    constructor(page){
        this.userName               = page.locator('[name="username"]')
        this.password               = page.locator('//label[text()="Password"]/parent::div/parent::div//input')
        this.loginButton            = page.locator('//button[normalize-space(text() ="Login")]')
        this.orangeHRMLogo          = page.locator('(//img[@alt="orangehrm-logo"])[last()]')
        this.forgetPasswordText     = page.locator('//p[starts-with(., "Forgot")]')
        this.pageHeadingText        = page.locator('//h6/parent::span')

        //logout
        this.usernameButton         = page.locator('//img[@alt="profile picture"]/parent::span//p')
        this.logoutButton           = page.locator('//li[contains(a,"Logout")]')
    }

    async validLogin(username,password){
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

    async logoutApplication(){
        await this.usernameButton.click()
        await this.logoutButton.click()
    }

    async waitForOrangeHRMLogo(timeout = 30000) {
        await this.orangeHRMLogo.waitFor(timeout);
    }
}export default LoginPage;