describe('Login', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com dados válidos devem permitir entrada no sistema', () => {

    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.valida.usuario)
      cy.get('#senha').type(credenciais.valida.senha)
      cy.screenshot('Após preencher dados válidos do login')
      cy.contains('button', 'Entrar').click()
      cy.screenshot('Após clicar no botão entrar')
      //Asserts
      cy.contains('h4', 'Realizar Transferência').should('be.visible')

    })
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {

    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.invalida.usuario)
      cy.get('#senha').type(credenciais.invalida.senha)
    })
    cy.contains('button', 'Entrar').click()

    //Asserts
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')

    //    cy.get('.toast').should('be.visible').contains('Erro no login. Tente novamente.') 
  })
})