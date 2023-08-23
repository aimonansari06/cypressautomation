//describe -> Treated as Test suite
//it ->Treated as Test case 
//Mocha testing framework standard



describe("My First Test Suite2",function(){

    it("Sales Agent Portal Login", function(){
       LoginSAP("AutoSalesAgent","Sales123","0028","0028 - Automation Builders Inc.","0002","Grandview B")
    })

})

function LoginSAP(username,password,strCommunityCode,strCommunity,strLot,strModel){
//     cy.visit("https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Account/Login?ReturnUrl=%2FSOMSalesApp%2F").then(()=>{
//         cy.url().should('eq','https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Account/Login?ReturnUrl=%2FSOMSalesApp%2F')

// }).then(()=>{
//     cy.get("#frmLogin").find(".form-group").eq(0).type(username)
// }).then(()=>{
//     cy.get("#frmLogin").find(".form-group").eq(1).type(password)
// }).then(()=>{
//     cy.get("#frmLogin").find(".form-group").eq(2).contains("Sign In").click()
// })

//.then wait until the promise is resolved

cy.visit("https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Account/Login?ReturnUrl=%2FSOMSalesApp%2F")
cy.url().should('eq','https://hbmks-oe117app.constellationhb.com/SOMSalesApp/Account/Login?ReturnUrl=%2FSOMSalesApp%2F')

 var heading=cy.get(".control-label.mb-10")
 cy.log(heading)

 cy.get(".control-label.mb-10").then(function(element){
    cy.log(element.text())
 })
//console.log("Hello world")
//resolving promise manually
//and catching whatever it resolved into a variable into argument as element
// cy.get("#frmLogin").find(".form-group").then(function(element){
//     cy.wrap(element).eq(0).type(username)
//     cy.wrap(element).eq(1).type(password)
//     cy.wrap(element).eq(2).contains("Sign In").click()
// })

cy.login(username,password)

}