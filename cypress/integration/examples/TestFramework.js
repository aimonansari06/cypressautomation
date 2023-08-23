import CartPage from "../pageObjects/CartPage"
import HomePage from "../pageObjects/HomePage"
import ProductPage from "../pageObjects/ProductPage"

describe("Test Suite2",function(){
    this.beforeEach(function(){
       cy.fixture('example').then(function(data){
        this.data=data ///this refers to whole class, to make this variable available to all testcases we are
        ////initializing it using this keyword so that it scope is not limited only inside of then block
       })
    })
    
    it('Understanding Hooks & Fixtures',function(){
        const homePage= new HomePage()
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        homePage.getNameTextbox().type(this.data.name).screenshot()
        homePage.getGenderDropdown().select(this.data.gender).screenshot()
        homePage.getNameTextbox().should('have.attr','minlength','2').screenshot()
        homePage.getTwoWayBinding().should('have.value',this.data.name).screenshot()
        

    })

    it('Commands',function(){
        //Cypress.config('defaultCommandTimeout',8000)
        const prodPage=new ProductPage()
        const cartPage=new CartPage()
        //cy.visit(Cypress.env('url')+'/angularpractice/shop')
        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')
        cy.url().should('include','/shop')


    this.data.productName.forEach(element => {
        cy.SelectProduct(element)
    });
    prodPage.getCheckoutButton().click()
    
    cartPage.SumOfProducts(cartPage.getProductAmounts())
    cy.contains("Checkout").click()
    cy.get('#country').type("Pakistan")
    
    cy.get(".suggestions ul li a",{ timeout: 8000 }).click()
    cy.get("#checkbox2").check({force: true})
    cy.get('.ng-untouched > .btn').click()
    cy.get('.alert').should('include.text', 'Success')
    })
})

//env variables, if there are values which weneed to set globally and apply to all testcases then instead of reusing them we can initialize 
//them into env variable