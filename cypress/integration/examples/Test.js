//describe -> Treated as Test suite
//it ->Treated as Test case 
//Mocha testing framework standard


describe("My First Test Suite",function(){

    it("Sales Agent Portal Login", function(){
       LoginSAP("AutoSalesAgent","Sales123","0028","0028 - Automation Builders Inc.","0002","Grandview B")
    })

    it("Design Agent Portal Login", function(){
        LoginDAP("AutoDesignAgent","Designer123")
     })
})

function LoginSAP(username,password,strCommunityCode,strCommunity,strLot,strModel){
    cy.visit("https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Account/Login?ReturnUrl=%2FSOMSalesApp%2F")
    cy.log(cy.url())
   //cy.url().should('eq','abcdef')
    cy.wait(1000)

    //cy.contains() ---> Get the DOM element containing the text
    //cy.find() --> get the descendent DOM element of specific selector //parent child chaining
    //each() iterate over dom element
    //eq() to access element at index given
    cy.get('#LoginUserName').as('loginTextbox')
    
    cy.log("Cypress Logs")
    console.log("Hello")
    //cy.get('#LoginUserName').should("be.disabled").should("exist")

    cy.login(username,password)

    cy.get('[data-project-code='+strCommunityCode+']').contains(strCommunity).click()
    //cy.get("#divCommunityLotListResult").find(".panel-wrapper.collapse.in").find("[data-lot-no=0002]").eq(6).click()
    
    cy.get("#divCommunityLotListResult").find(".panel-wrapper.collapse.in").each(($el, index, $list) => {
        // $el is a wrapped jQuery element
       var lotname=$el.find("[data-lot-no="+strLot+"]").text()
       if(lotname.includes(strLot)){
        cy.log(lotname)
        cy.wrap($el).find("[role=button]")
        cy.wrap($el).find("[role=button]:visible").contains(strModel).click()
       }
      })
     
    //.panel-wrapper collapse in col-lg-4 col-md-6 col-sm-6 col-xs-12 border-panel Sold community-item animated fadeIn
    // cy.get('#LoginUserName').type(username)
    // var x=cy.get('#LoginUserName').should('have.value',username).should("be.enabled").should("exist")
    // console.log(x)
    // //cy.get('#LoginUserName').should("be.enabled")
    // //cy.get('#LoginUserName').should("exist")
    // cy.get('#LoginPassword').type(password)
    // cy.get('#LoginPassword').should('have.value',password)
    // cy.get('#SubmitButton').click()
    // cy.url().should('eq','https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Community/CommunityList')
}

function LoginDAP(username,password){
    cy.visit("https://hbmks-oe117app.constellationhb.com/SOMDesignApp/Account/Login?ReturnUrl=%2FSOMDesignApp%2F")
    cy.url().should('eq','https://hbmks-oe117app.constellationhb.com/SOMDesignApp/Account/Login?ReturnUrl=%2FSOMDesignApp%2F')
    cy.get('#LoginUserName').type(username)
    cy.get('#LoginUserName').should('have.value',username)
    cy.get('#LoginPassword').type(password)
    cy.get('#LoginPassword').should('have.value',password)
    cy.get('.ui-btn > .ui-btn-inline').click()
    cy.url().should('eq','https://hbmks-oe117app.constellationhb.com/SOMDesignApp/')
}