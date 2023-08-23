class HomePage{
    getNameTextbox(){
        return cy.get(':nth-child(1) > .form-control')
    }
    getGenderDropdown(){
        return cy.get('#exampleFormControlSelect1')
    }
    getTwoWayBinding(){
        return cy.get(':nth-child(4) > .ng-untouched')
    }
}

export default HomePage