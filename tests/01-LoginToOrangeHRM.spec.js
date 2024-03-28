import { test,expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
const data = require ('../dataFiles/dynamic_data/OrangeHRM.json')
const assertionsText = require('../dataFiles/dynamic_data/assertionsTest.json')
let page
let loginPage
let context

test.describe('Login to Orange HRM', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage()
        loginPage = new LoginPage(page)
    })

    test.afterAll(async() => {
        await loginPage.logoutApplication()
    })

    test.afterAll(async() =>{
        await context.close()
    })

    test('User is able to login to the application',async() => {
        await page.goto(data.Login.url,{waitUntil:'load'})
        expect(await loginPage.orangeHRMLogo).toBeAttached()
        expect(await loginPage.forgetPasswordText.textContent()).toContain(assertionsText.forgetPassword)
        await loginPage.validLogin(data.Login.username,data.Login.password)
        expect(await loginPage.pageHeadingText.textContent()).toMatch(assertionsText.dashboard)
    })
})

