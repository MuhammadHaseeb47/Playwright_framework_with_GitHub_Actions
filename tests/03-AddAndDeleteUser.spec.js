import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
const data = require ('../dataFiles/dynamic_data/OrangeHRM.json')
const assertionsText = require('../dataFiles/dynamic_data/assertionsTest.json')
import { UserManagementPage } from '../pages/UserManagementPage';
import CommonLocators from '../pages/commonLocatorsPage';

let page;
let loginPage
let homePage
let userManagement
let commonLocators;
let context
    test.describe('User Management',() => {

        test.beforeAll(async({browser}) => {
            context = await browser.newContext()
            page = await context.newPage();
            loginPage = new LoginPage(page)
            homePage = new HomePage(page)
            userManagement = new UserManagementPage(page)
            commonLocators = new CommonLocators(page)
        })

        test.beforeEach(async() => {
            await page.goto(data.Login.url ,{waitUntil:'load'})
            expect(await loginPage.forgetPasswordText.textContent()).toContain(assertionsText.forgetPassword)
            await loginPage.validLogin(data.Login.username,data.Login.password)
            expect(await loginPage.pageHeadingText.textContent()).toMatch(assertionsText.dashboard)
        })

        test.afterAll(async() =>{
            await context.close()
        })

        test('verify that the user is able to add user', async() =>{
            await homePage.clickAdminButton()
            await userManagement.addUserInfo(data.EmployeeInfo.employeeName)
            await userManagement.addLoginInfo(data.UserData.username,data.UserData.password)
            await commonLocators.clickSaveButton()
        })
    })