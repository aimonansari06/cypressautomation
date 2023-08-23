class CartPage{
    getProductAmounts(){
        return cy.get("tr td:nth-child(4) strong")
    }
    SumOfProducts(prodLoc){
        var sum=0
        prodLoc.each(($el,list,$index)=>{
            const amount=$el.text() //$, 10000
            cy.log(amount)
            var res=amount.split(" ")
            res=res[1].trim()
            sum=sum+Number(res)
        
        }).then(function(){
            cy.get('tr td:nth-child(5) strong').then(function(el){
                var resTotal=el.text()
                var total=resTotal.split(" ")
            total=total[1].trim()
            expect(Number(total)).to.equal(sum)
            })
            
            cy.log(sum)
        })
        
    }
}

export default CartPage