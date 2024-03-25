const {test, expect} = require('@playwright/test')
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import CommonMethods from '../utils/commonMethods'
const data = require ('../dataFiles/OrangeHRM.json')
const { PIM } = require('../pages/PIMPage');

let loginPage;
let homePage;
let pimPage;
let page;
let commonMethods;
test.describe('PIM | Employee Management',()=> {

    test.beforeAll(async({browser})=> {
        const context = await browser.newContext();
        page = await context.newPage()
        loginPage = new LoginPage()
        homePage = new HomePage()
        pimPage = new PIM()
        commonMethods = new CommonMethods();
    })

    test.beforeEach(async()=>{
        await page.goto(data.Login.url,{waitUntil:'load'})
        expect(await loginPage.forgetPasswordText.textContent()).toContain('Forgot your password')
        await loginPage.validLogin(data.Login.username,data.Login.password)
        expect(await loginPage.pageHeadingText.textContent()).toMatch('Dashboard')
    })

    test('User ia able to create employee',async()=>{
        await homePage.clickPimButton()
    })

})