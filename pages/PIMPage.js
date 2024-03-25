class PIM{
    constructor(page){


        this.h6Heading              = page.locator('//h6')
        this.firstName              = page.locator('[placeholder="First Name"]')
        this.middleName             = page.locator('input[placeholder="Middle Name"]')
        this.lastName               = page.locator('[placeholder="Last Name"]')
        


    }


}