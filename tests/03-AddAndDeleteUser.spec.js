import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
const data = require ('../dataFiles/OrangeHRM.json')
const { UserManagement } = require('../pages/UserManagementPage');

let page;
let loginPage
let homePage
let userManagement

    test.describe('User Management',() => {

        test.beforeAll(async({browser}) => {
            let context = await browser.newContext()
            page = await context.newPage();
            loginPage = new LoginPage(page)
            homePage = new HomePage(page)
            userManagement = new UserManagement(page)
        })

        test.beforeEach(async() => {
            await page.goto(data.Login.url ,{waitUntil:'load'})
            expect(await loginPage.forgetPasswordText.textContent()).toContain('Forgot your password')
            await loginPage.validLogin(data.Login.username,data.Login.password)
            expect(await loginPage.pageHeadingText.textContent()).toMatch('Dashboard')
        })

        test('verify that the user is able to add user', async() =>{
            await homePage.clickAdminButton()
            await userManagement.addUserInfo(data.UserData.username,data.UserData.password)
        })
    })