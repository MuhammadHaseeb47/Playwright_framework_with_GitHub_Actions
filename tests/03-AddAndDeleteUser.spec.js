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
let loginUser


    test.describe('User Management',() => {

        test.beforeAll(async({browser}) => {
            context = await browser.newContext()
            page = await context.newPage();
            loginPage = new LoginPage(page)
            homePage = new HomePage(page)
            userManagement = new UserManagementPage(page)
            commonLocators = new CommonLocators(page)
        })
        
        test.beforeEach(async ({}, testInfo) => {
            if (testInfo.title !== 'employee is able to login to the application') {
                await page.goto(data.Login.url, { waitUntil: 'load' });
                await loginPage.waitForOrangeHRMLogo();
                expect(await loginPage.orangeHRMLogo).toBeAttached()
                expect(await loginPage.forgetPasswordText.textContent()).toContain(assertionsText.forgetPassword)
                await loginPage.validLogin(data.Login.username, data.Login.password)
                expect(await loginPage.pageHeadingText.textContent()).toMatch(assertionsText.admin)
            }
        });

        test.afterEach(async() => {
            await loginPage.logoutApplication()
        })

        test.afterAll(async() =>{
            await context.close()
        })

        test.skip('employee is able to login to the application',async() => {
            await page.goto(data.Login.url ,{waitUntil:'load'})
            expect(await loginPage.forgetPasswordText.textContent()).toContain(assertionsText.forgetPassword)
            await loginPage.validLogin(data.UserData.employeeUsername,data.UserData.password)
            expect(await loginPage.pageHeadingText.textContent()).toMatch(assertionsText.dashboard)
            loginUser = data.EmployeeInfo.firstName + ' ' + data.EmployeeInfo.employeeId
            expect(await homePage.extractUsernameText()).toContain(loginUser)
        })

        test('verify that the user is able to add user', async() =>{
            await homePage.clickAdminButton()
            await userManagement.addUserInfo(data.EmployeeInfo.employeeName)
            await userManagement.addLoginInfo(data.UserData.username,data.UserData.password)
            await commonLocators.clickSaveButton()
        })

        test('verify that the user is able to search and delete the user',async()=>{
            await homePage.clickAdminButton();
            await userManagement.addUserInfo(data.EmployeeInfo.employeeName)
            expect (await commonLocators.oneRecordFoundText).toHaveText(assertionsText.oneRecord)

            expect(await commonLocators.cellsInTable(2)).toContain(data.UserData.employeeUsername)
            expect(await commonLocators.cellsInTable(3)).toContain(data.UserData.userRole)
            expect(await commonLocators.cellsInTable(4)).toContain(loginUser)
            expect(await commonLocators.cellsInTable(5)).toContain(data.UserData.userStatus)

            await commonLocators.deleteEntry()
            expect (await commonLocators.notification.textContent()).toMatch(assertionsText.success)
        })
    })