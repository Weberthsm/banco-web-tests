describe('Login', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.screenshot('apos-visitar-pagina')
  })

  it('Login com dados válidos devem permitir entrada no sistema', () => {


    cy.fazerLoginComCredenciaisValidas()
  
    //Asserts
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    
    
    cy.fazerLoginComCredenciaisInvalidas()
    //Asserts
    cy.verificarMensagemNoToast('Erro no login. Tente novamente.')
  })
})