// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//  Cypress.Commands.add('login', (username, password) => { 
//     cy.get("#frmLogin").find(".form-group").eq(0).type(username)
//  cy.get("#frmLogin").find(".form-group").eq(1).type(password)
//  cy.get("#frmLogin").find(".form-group").eq(2).contains("Sign In").click() 
// })
Cypress.Commands.add('SelectProduct',(productName)=>{
  cy.get('h4.card-title').each(($el,index,$list)=>{
    if($el.text().includes(productName)) {
     cy.get(".btn.btn-info").eq(index).click()
    }
 })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

if (Cypress.config('hideXHR')) {
    const app = window.top;
  
    if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
      const style = app.document.createElement('style');
      style.innerHTML =
        '.command-name-request, .command-name-xhr { display: none }';
      style.setAttribute('data-hide-command-log-request', '');
  
      app.document.head.appendChild(style);
    }
}
  