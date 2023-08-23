/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'


describe("Test Suite1",function(){

    it("Handling Web Controls 1", function(){
        //cy.viewport(1700, 900)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        
        // ///checkboxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1').and('be.visible')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2','option3'])
        cy.get('#checkBoxOption2').check()

        // //dropdowns
        // //static dropdowns
        cy.get('#dropdown-class-example').select('option1').should('have.value','option1')

        // //dynamic dropdowns
        cy.get('#autocomplete').type('pa')
        cy.get('.ui-menu-item div').each(($el,index,$list)=>
        {
            if($el.text()==="Pakistan"){
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value','Pakistan')

        ///visiblity
        cy.get('#hide-textbox').click()
        cy.get("#displayed-text").should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get("#displayed-text").should('be.visible')

        ////Cypress auto accept alerts and confirm boxes
        ///to verify text on alert and confirm boxes we need to handle an event which occurs on browser called
        ///window:alert,window:confirm this event will fire when there is any alert or confirm box on web browser
        ///cy.on() is a command through which we can trigger those elements because cypress can manipulate our browser
        //cy.on(input, output)
        cy.get('#alertbtn').click()
        cy.on('window:alert',(str)=>{
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.get('#confirmbtn').click()
        cy.on('window:confirm',(str)=>{
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
    })

    it('Navigation',function(){
       

        
        ///cypress cannot work on child tabs, in cypress there is no way to switch to child browser or tabs
        ///target attribute in html element allows you to open link another tab
        //to open in link in a same window cypress need to manipulate dom in such a way it will open in same tab
        //we will remove target attribute throuh cypress so that it will open in a same window
        //invoke ==> invokes a function on the yielded object
        //removeAttr function of jquery, which will remove attribute of specific locator. we can call it in cypress
        //using invoke command
       
        cy.visit("https://www.letskodeit.com/practice")
        cy.get('#opentab').invoke('removeAttr','target').click()
        cy.url().should('include','courses')
        cy.go('back')
        cy.url().should('eq','https://www.letskodeit.com/practice')
        cy.go('forward')
        cy.url().should('include','courses')
    })

   it('Web Tables',function(){
    cy.visit('https://www.letskodeit.com/practice')
        // cy.get("#product").find('tr td:nth-child(2)').each(($el,index,$list)=>{
        //     if($el.text()==="JavaScript Programming Language"){
        //         cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){
        //             const priceText=price.text()
        //             expect(priceText).to.equal('25')
        //         })
                
        //     }
        // })
        cy.get("#product").find('tr th').each(($el,index,$list)=>{ ///accessing column names
            const strText=$el.text()
            if(strText.includes('Course')){
                const ind=index+1 ///its index is 1 where as in nth child it's number 2 so +1
                cy.get("#product").find('tr td:nth-child('+ind+')').each(($el1,index1,$list1)=>{ //acessing Course column
                    if($el1.text()==="JavaScript Programming Language"){ //find text in course column
                        cy.log(index1)
                        cy.get('tr td:nth-child('+ind+')').eq(index1).next().then(function(price){
                            const priceTxt=price.text()
                            expect(priceTxt).to.equal('25')
                        })
                    }
                })
            }
        })
        
       
        
   })
   it('Mouse Hover',function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
     ////Mouse Hover
        ////show method should be applied to the immediate parent of hidden element
        cy.get('.mouse-hover-content').invoke('show')///jquerymethod
        cy.contains('Top').click()

       // cy.contains('Top').click({force:true})
        cy.url().should('include','#top')
   })

   it('Handling child tabs & Working on different domains',function(){
     cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
     cy.get('#opentab').invoke('removeAttr','target').click()
    
    
    cy.origin('https://www.qaclickacademy.com/',function (){
        cy.contains('About us').click()
        cy.url().should('eq','https://www.qaclickacademy.com/about.html')
    })
   })

   it('handling iFrames',function(){
    //npm install -D cypress-iframe
//     /// <reference types="Cypress" />
//     /// <reference types="cypress-iframe" />
//      import 'cypress-iframe' at top of file so that it will list iframe methods as auto suggestion
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.frameLoaded("#courses-iframe")
    cy.iframe().find("a[href='mentorship']").eq(0).click()
    cy.wait(7000)
    cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)
   })

   
})
