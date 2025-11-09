describe('Transferencias', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('credenciais').then(credenciais => {
            cy.get('#username').click().type(credenciais.valida.usuario)
            cy.get('#senha').type(credenciais.valida.senha)
        })
          cy.contains('button', 'Entrar').click()
    })

    it('Deve transferir quando informando dados e valores válidos', () => {

        cy.get('label[for="conta-origem"]').parent().as('campo-conta-origem')
        cy.get('@campo-conta-origem').click()
        cy.get('@campo-conta-origem').contains('João da Silva com saldo de R$ 14').click()

        cy.get('label[for="conta-destino"]').parent().as('campo-conta-destino')
        cy.get('@campo-conta-destino').click()
        cy.get('@campo-conta-destino').contains('Maria Oliveira com saldo de R$ 23').click()

        cy.get('#valor').click().type(100)
        cy.contains('button', 'Transferir').click()
        cy.get('.toast').contains('Transferência realizada!')
    })
})