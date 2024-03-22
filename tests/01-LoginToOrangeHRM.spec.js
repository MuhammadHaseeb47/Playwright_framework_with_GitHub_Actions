import { test,expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
const data = require('../dataFiles/OrangeHRM.json');
let page
let loginPage

test.describe('Login to Orange HRM', () => {

    test.beforeAll(async ({ browser }) => {
        let context = await browser.newContext();
        page = await context.newPage()
        loginPage = new LoginPage(page)
    })

    test.afterAll(async() => {
        await loginPage.logoutApplication()
    })

    test('User is able to login to the application',async() => {
        await page.goto(data.Login.url,{waitUntil:'load'})
        expect(await loginPage.orangeHRMLogo).toBeAttached()
        expect(await loginPage.forgetPasswordText.textContent()).toContain('Forgot your password')
        await loginPage.validLogin(data.Login.username,data.Login.password)
        expect(await loginPage.pageHeadingText.textContent()).toMatch('Dashboard')
    })
})

