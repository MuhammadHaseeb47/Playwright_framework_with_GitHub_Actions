const path = require('path');

class PIMPage{
    constructor(page){
        this.page = page
        this.h6Heading              = page.locator('//h6')
        this.firstName              = page.locator('[placeholder="First Name"]')
        this.middleName             = page.locator('input[placeholder="Middle Name"]')
        this.lastName               = page.locator('[placeholder="Last Name"]')
        this.employeeId             = page.locator('//label[text()="Employee Id"]/parent::div/following-sibling::div//input')
        this.saveButton             = page.locator('//button[contains(.,"Save")]')
        this.licenseNumber          = page.locator('//label[contains(.,"License Number")]/parent::div/following-sibling::div//input')
        this.licenseExpiryDate      = page.locator('//label[contains(.,"License Expiry")]/parent::div/following-sibling::div//input')
        this.profilePicture         = page.locator('//h6[text()="Add Employee"]/following::form/div//input[@type="file"]')
        this.createLoginDetails     = page.locator('//p[contains(.,"Create Login")]/parent::div/div//span')
        this.employeeList           = page.locator('//li[contains(a,"Employee List")]')
        this.nationalityField       = page.locator('//label[text()="Nationality"]/parent::div/following-sibling::div')
        this.genderField            = page.locator('//label[text()="Gender"]/parent::div/following-sibling::div')
        this.jobButton              = page.locator('//div[contains(a,"Job")]')
        this.jobTitleField          = page.locator('//div[contains(label,"Job Title")]/following-sibling::div')
        this.employmentStatusField  = page.locator('//div[contains(label,"Employment Status")]/following-sibling::div')
        this.subUnitField           = page.locator('//div[contains(label,"Sub Unit")]/following-sibling::div')
        this.reportToButton         = page.locator('//div[contains(a,"Report-to")]')
        this.addAssignedSupervisor  = page.locator('//div[contains(h6,"Assigned Supervisors")]//button[text()=" Add "]')
        this.addSupervisorName      = page.locator('//div[contains(h6,"Add Supervisor")]//div//input')
        this.reportingMethod        = page.locator('//div[contains(label,"Reporting Method")]/following-sibling::div')
        this.employeeNameSearchBar  = page.locator('//div[(contains(label,"Employee Name"))]/following-sibling::div//input')
        this.employeeIdSearchBar    = page.locator('//div[(contains(label,"Employee Id"))]/following-sibling::div//input')

    }

    async enterSearchData(name,id){
        await this.employeeNameSearchBar.fill(name)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.employeeIdSearchBar.fill(id)
    }

    async clickAddAssignedSupervisor(name,method){
        await this.addAssignedSupervisor.click()
        await this.addSupervisorName.fill(name)
        await this.page.waitForTimeout(2000)
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.reportingMethod.click()
        await this.selectDropdownValue(method)
    }

    async clickReportToButton(){
        await this.reportToButton.click()
    }

    async clickJobButton(){
        await this.jobButton.click()
    }

    async addEmployeeNameAndId(first,middle,last,id){
        await this.firstName.fill(first)
        await this.middleName.fill(middle)
        await this.lastName.fill(last)
        await this.employeeId.fill(id)
    }

    async selectNationality(title){
        await this.nationalityField.click();
        await this.selectDropdownValue(title)
    }

    async selectGender(gender){
        await this.page.locator(`//div[contains(label,"${gender}")]//span`).focus()
        await this.page.locator(`//div[contains(label,"${gender}")]//span`).click()
    }

    async selectDropdownValue(title){
        await this.page.locator(`//div[contains(span,"${title}")]`).click()
    }

    async selectJobTitle(title){
        await this.jobTitleField.click()
        await this.selectDropdownValue(title)
    }

    async selectEmploymentStatus(title){
        await this.employmentStatusField.click()
        await this.selectDropdownValue(title)
    }

    async selectSubUnit(title){
        await this.subUnitField.click()
        await this.selectDropdownValue(title)
    }

    // async addProfilePicture(filePath, fileName) {
    //     const inputFile = await this.profilePicture.input();
    //     await inputFile.dispatchEvent('change', { files: [path.join(filePath, fileName)] });
    // }

    async clickCreateLoginDetailsButton(){
        await this.createLoginDetails.focus()
        await this.createLoginDetails.click()
    }

}export default PIMPage