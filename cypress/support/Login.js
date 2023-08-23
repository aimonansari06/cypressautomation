Cypress.Commands.add('login', (username, password) => { 
    cy.get("#frmLogin").find(".form-group").eq(0).type(username)
 cy.get("#frmLogin").find(".form-group").eq(1).type(password)
 cy.get("#frmLogin").find(".form-group").eq(2).contains("Sign In").click() 
})