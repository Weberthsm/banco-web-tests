Cypress.Commands.add('realizarTransferencia', (contaOrigem, contaDestino, valor) => {
    cy.selecionarOpcaoNaComboBox('conta-origem',contaOrigem);
    cy.selecionarOpcaoNaComboBox('conta-destino',contaDestino);
    cy.get('#valor').click().type(valor)
    cy.contains('button', 'Transferir').click()
})

        // cy.selecionarOpcaoNaComboBox('conta-origem','João da Silva com saldo de R$ 14');
        // cy.selecionarOpcaoNaComboBox('conta-destino','Maria Oliveira com saldo de R$ 23');
        // cy.get('#valor').click().type(10)
        // cy.contains('button', 'Transferir').click()