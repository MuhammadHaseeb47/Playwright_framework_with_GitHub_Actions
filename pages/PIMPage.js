const path = require('path');

class PIMPage{
    constructor(page){
        this.h6Heading              = page.locator('//h6')
        this.firstName              = page.locator('[placeholder="First Name"]')
        this.middleName             = page.locator('input[placeholder="Middle Name"]')
        this.lastName               = page.locator('[placeholder="Last Name"]')
        this.employeeId             = page.locator('//label[text()="Employee Id"]/parent::div/following-sibling::div//input')
        this.saveButton             = page.locator('//button[contains(.,"Save")]')
        this.licenseNumber          = page.locator('//label[contains(.,"License Number")]/parent::div/following-sibling::div//input')
        this.licenseExpiryDate      = page.locator('//label[contains(.,"License Expiry")]/parent::div/following-sibling::div//input')
        this.profilePicture         = page.locator('//h6[text()="Add Employee"]/following::form/div//input[@type="file"]')
        this.createLoginDetails     = page.locator('//p[contains(.,"Create Login")]/parent::div/div//input[@type="checkbox"]')
        
    }

    async addEmployeeNameAndId(first,middle,last,id){
        await this.firstName.fill(first)
        await this.middleName.fill(middle)
        await this.lastName.fill(last)
        await this.employeeId.fill(id)
    }

    async selectNationality(country){
        await this.page.locator(`//div[contains(span,"${country}")]`)
    }

    async selectGender(gender){
        await this.page.locator(`//div[contains(span,"${gender}")]`)
    }

    async addProfilePicture(filePath,myfile){
        await this.profilePicture.setInputFiles(path.join(filePath, myfile));
    }

    async clickCreateLoginDetailsButton(){
        await this.createLoginDetails.click()
    }



}export default PIMPage