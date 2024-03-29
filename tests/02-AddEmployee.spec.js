const {test, expect} = require('@playwright/test')
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import CommonMethods from '../utils/commonMethods'
import CommonLocators from '../pages/commonLocatorsPage'
const data = require ('../dataFiles/dynamic_data/OrangeHRM.json')
import PIMPage from '../pages/PIMPage'
import { UserManagementPage } from '../pages/UserManagementPage'
const assertionsText = require('../dataFiles/dynamic_data/assertionsTest.json')
const fs = require('fs');
const path = require('path');

let loginPage;
let homePage;
let pimPage;
let page;
let commonMethods;
let commonLocators;
let employeeId;
let userManagement;
let user;
let context

test.describe('PIM | Employee Management',()=> {

    test.beforeAll(async({browser})=> {
        context = await browser.newContext();
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

    test.afterEach(async()=>{
        await loginPage.logoutApplication()
    })

    test.afterAll(async() =>{
        await context.close()
    })

    test('User is able to create employee',async()=>{
        user = await homePage.extractUsernameText()
        await homePage.clickPimButton()
        await commonLocators.clickAddButton()

        employeeId = commonMethods.generateRandomNumber(10000)

        await pimPage.addEmployeeNameAndId(data.EmployeeInfo.firstName,data.EmployeeInfo.middleName,employeeId,employeeId)

        await page.waitForTimeout(1000)
        await pimPage.clickCreateLoginDetailsButton()

        let employeeUsername = employeeId.concat(data.UserData.username)
        let employee = data.EmployeeInfo.firstName + ' ' + data.EmployeeInfo.middleName + " " + employeeId

        await userManagement.addLoginInfo(employeeUsername,data.UserData.password)

        await commonLocators.clickSaveButton();
        expect (await commonLocators.notification.textContent()).toMatch(assertionsText.success)

        await pimPage.selectNationality(data.EmployeeInfo.nationality)
        await pimPage.selectGender(data.EmployeeInfo.gender)

        await commonLocators.clickButtonToSave(1);

        await pimPage.clickJobButton()
        await pimPage.selectJobTitle(data.EmployeeInfo.jobTitle)
        await pimPage.selectEmploymentStatus(data.EmployeeInfo.employmentStatus)
        await pimPage.selectSubUnit(data.EmployeeInfo.subUnit)

        await commonLocators.clickSaveButton();
        expect (await commonLocators.notification.textContent()).toMatch(assertionsText.success)

        await pimPage.clickReportToButton()
        await pimPage.clickAddAssignedSupervisor(user,data.EmployeeInfo.reportingMethod)

        await commonLocators.clickSaveButton();

        let jsonData = JSON.parse(fs.readFileSync('dataFiles/dynamic_data/OrangeHRM.json', 'utf8'));
        jsonData.UserData.employeeUsername = employeeUsername;
        jsonData.EmployeeInfo.employeeId = employeeId;
        jsonData.EmployeeInfo.employeeName = employee;
        fs.writeFileSync('dataFiles/dynamic_data/OrangeHRM.json', JSON.stringify(jsonData, null, 4), 'utf8');

        expect (await commonLocators.notification.textContent()).toMatch(assertionsText.success)
    })

    test('user is able to search the employee',async()=>{
        await homePage.clickPimButton()
        expect(await pimPage.h6Heading).toContainText(assertionsText.pimHeading)
        
        await pimPage.enterSearchData(data.EmployeeInfo.employeeName,data.EmployeeInfo.employeeId)
        await commonLocators.clickSearchButton()
        await page.waitForTimeout(2000);
        expect (await commonLocators.oneRecordFoundText).toHaveText(assertionsText.oneRecord)

        let name = data.EmployeeInfo.firstName + ' ' + data.EmployeeInfo.middleName

        expect(await commonLocators.cellsInTable(2)).toContain(data.EmployeeInfo.employeeId)
        expect(await commonLocators.cellsInTable(3)).toContain(name)
        expect(await commonLocators.cellsInTable(4)).toContain(data.EmployeeInfo.employeeId)
        expect(await commonLocators.cellsInTable(5)).toContain(data.EmployeeInfo.jobTitle)
        expect(await commonLocators.cellsInTable(6)).toContain(data.EmployeeInfo.employmentStatus)
        expect(await commonLocators.cellsInTable(7)).toContain(data.EmployeeInfo.subUnit)
        expect(await commonLocators.cellsInTable(8)).toContain(user)
    })

})