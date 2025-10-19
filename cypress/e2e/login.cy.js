describe('Login', () => {
  
  beforeEach(() => {
     cy.visit('http://localhost:4000')
  })
  
  it('Login com dados válidos devem permitir entrada no sistema', () => {
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').type('123456')
    cy.contains('button', 'Entrar').click()

    //Asserts
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

    it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').type('654321')
    cy.contains('button', 'Entrar').click()

    //Asserts
    cy.get('.toast').should('have.text','Erro no login. Tente novamente.')
    
    //    cy.get('.toast').should('be.visible').contains('Erro no login. Tente novamente.') 
  })
})