const {test, expect} = require('@playwright/test')
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import CommonMethods from '../utils/commonMethods'
import CommonLocators from '../pages/commonLocatorsPage'
const data = require ('../dataFiles/dynamic_data/OrangeHRM.json')
import PIMPage from '../pages/PIMPage'
import { UserManagementPage } from '../pages/UserManagementPage'
const assertionsText = require('../dataFiles/dynamic_data/assertionsTest.json')


let loginPage;
let homePage;
let pimPage;
let page;
let commonMethods;
let commonLocators;
let employeeId
let userManagement
test.describe('PIM | Employee Management',()=> {

    test.beforeAll(async({browser})=> {
        const context = await browser.newContext();
        page = await context.newPage()
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        pimPage = new PIMPage(page)
        commonMethods = new CommonMethods();
        commonLocators = new CommonLocators(page)
        userManagement = new UserManagementPage(page)
        })

    test.beforeEach(async()=>{
        await page.goto(data.Login.url,{waitUntil:'load'})
        expect(await loginPage.forgetPasswordText.textContent()).toContain(assertionsText.forgetPassword)
        await loginPage.validLogin(data.Login.username,data.Login.password)
        expect(await loginPage.pageHeadingText.textContent()).toMatch(assertionsText.dashboard)
    })

    test('User is able to create employee',async()=>{
        await homePage.extractUsernameText()
        await homePage.clickPimButton()
        await commonLocators.clickAddButton()

        employeeId = commonMethods.generateRandomNumber(10000)

        await pimPage.addEmployeeNameAndId(data.EmployeeInfo.firstName,data.EmployeeInfo.middleName,employeeId,employeeId)

        var fixturePath = '../dataFiles'
        await pimPage.addProfilePicture(fixturePath ,'linkedin_post.png')

        await pimPage.clickCreateLoginDetailsButton
        await userManagement.addLoginInfo(data.UserData.username,data.UserData.password)
        await commonLocators.clickSaveButton();
        
        expect (await commonLocators.notification.textContent()).toMatch(assertionsText.success)
    })

    test('user is able to search the employee',async()=>{
        
    })

})