describe('Transferencias', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fazerLoginComCredenciaisValidas()

    })

    it('Deve transferir quando informando dados e valores válidos', () => {

        cy.realizarTransferencia('João da Silva com saldo de R$ 14','Maria Oliveira com saldo de R$ 23', '10.0')

        // cy.selecionarOpcaoNaComboBox('conta-origem','João da Silva com saldo de R$ 14');
        // cy.selecionarOpcaoNaComboBox('conta-destino','Maria Oliveira com saldo de R$ 23');
        // cy.get('#valor').click().type(10)
        // cy.contains('button', 'Transferir').click()
        
        cy.verificarMensagemNoToast('Transferência realizada!')
    })

     it('Deve apresentar erro quando tentar trasferir mais que 5000 sem informar o token', () => {

     cy.realizarTransferencia('João da Silva com saldo de R$ 14','Maria Oliveira com saldo de R$ 23', '5000.1')

        // cy.selecionarOpcaoNaComboBox('conta-origem','João da Silva com saldo de R$ 14');
        // cy.selecionarOpcaoNaComboBox('conta-destino','Maria Oliveira com saldo de R$ 23');
        // cy.get('#valor').click().type(5000.01)
        // cy.contains('button', 'Transferir').click()
        
        cy.verificarMensagemNoToast('Autenticação necessária para transferências acima de R$5.000,00.')
    })
    
})