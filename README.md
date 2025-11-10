# banco-web-tests

Suite de testes end-to-end com Cypress + JavaScript do projeto Banco Web. O objetivo deste repositório é apoiar a aprendizagem da Mentoria 2.0, mostrando na prática como automatizar cenários de UI com Cypress, organizando o código com Custom Commands e gerando relatórios em HTML com cypress-mochawesome-reporter.

## Componentes do projeto

- Cypress 14 (E2E Testing)
- JavaScript (ES Modules no suporte)
- Custom Commands (em `cypress/support/commands/*`)
- Fixtures (em `cypress/fixtures/`)
- Testes E2E (em `cypress/e2e/`)
- Relatórios HTML via `cypress-mochawesome-reporter`
- Screenshots e vídeos (padrão do Cypress; vídeos desativados via config por padrão)

Estrutura principal:

```
cypress.config.js
package.json
cypress/
  e2e/
    login.cy.js
    transferencia.cy.js
  fixtures/
    credenciais.json
  support/
    e2e.js
    commands.js
    commands/
      common.js
      login.js
      transferencia.js
  reports/html/index.html (gerado após execução)
  screenshots/ (gerado)
  videos/ (gerado; desativado por padrão)
```

## Pré-requisitos

- Node.js (recomendado LTS 18+)
- npm (vem com o Node)
- Aplicações do sistema em execução para execução real end-to-end e para geração dos relatórios:
  - API: https://github.com/Weberthsm/banco-api
  - Web: https://github.com/Weberthsm/banco-web

Observação: a baseUrl padrão dos testes é `http://localhost:4000` (veja `cypress.config.js`). Certifique-se de que a aplicação Web esteja rodando nessa URL/porta ao executar os testes localmente.

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/Weberthsm/banco-web-tests.git
cd banco-web-tests

# Instalar as dependências
npm install
```

## Como executar os testes

Antes de rodar os testes, suba a API e a aplicação Web conforme as instruções dos respectivos repositórios. Com tudo no ar:

- Executar todos os testes em modo headless (padrão, baseUrl local):

```bash
npm run test
```

- Abrir o Test Runner interativo do Cypress:

```bash
npm run cy:open
```

- Rodar em modo headed (janela do navegador visível):

```bash
npm run cy:headed
```

- Executar apontando para ambientes alternativos (scripts existentes):

```bash
npm run test-qa
npm run test-prod
```

Dica: os scripts `test-qa` e `test-prod` definem uma variável de ambiente `URL`, porém a `baseUrl` efetiva é definida em `cypress.config.js`. Para sobrescrever diretamente a baseUrl via CLI, você também pode usar:

```bash
npx cypress run --config baseUrl=https://seu-ambiente
```

## Relatórios (cypress-mochawesome-reporter)

Este projeto utiliza `cypress-mochawesome-reporter` para gerar relatórios em HTML automaticamente durante a execução dos testes. A integração está configurada em `cypress.config.js` e registrada em `cypress/support/e2e.js`.

- Após uma execução, abra o relatório em:
  - `cypress/reports/html/index.html`

- Pré-condição: a API e a aplicação Web precisam estar em execução para que os testes end-to-end rodem e o relatório seja gerado com sucesso.

## Documentação dos testes

### `cypress/e2e/login.cy.js`

- Cenário: Login com dados válidos deve permitir entrada no sistema
  - Ações: visita a página inicial, executa `cy.fazerLoginComCredenciaisValidas()`
  - Verificação: presença do título "Realizar Transferência"
- Cenário: Login com dados inválidos deve apresentar mensagem de erro
  - Ações: visita a página inicial, executa `cy.fazerLoginComCredenciaisInvalidas()`
  - Verificação: `cy.verificarMensagemNoToast('Erro no login. Tente novamente.')`

### `cypress/e2e/transferencia.cy.js`

- Pré-condição (`beforeEach`): visita a página e realiza login válido
- Cenário: Deve transferir quando informando dados e valores válidos
  - Ações: `cy.realizarTransferencia('João da Silva com saldo de R$ 14','Maria Oliveira com saldo de R$ 23', '10.0')`
  - Verificação: `cy.verificarMensagemNoToast('Transferência realizada!')`
- Cenário: Deve apresentar erro ao transferir acima de 5000 sem token
  - Ações: `cy.realizarTransferencia('João da Silva com saldo de R$ 14','Maria Oliveira com saldo de R$ 23', '5000.1')`
  - Verificação: `cy.verificarMensagemNoToast('Autenticação necessária para transferências acima de R$5.000,00.')`

### Fixtures

- `cypress/fixtures/credenciais.json`
  - `valida`: `{ usuario: 'julio.lima', senha: '123456' }`
  - `invalida`: `{ usuario: 'julio.lima', senha: '654321' }`

## Custom Commands

Os comandos customizados ficam em `cypress/support/commands/*` e são importados por `cypress/support/commands.js`.

### Comandos de login (`cypress/support/commands/login.js`)

- `cy.fazerLoginComCredenciaisValidas()`
  - Usa fixture `credenciais.valida` para preencher `#username` e `#senha`, e clica no botão "Entrar".
- `cy.fazerLoginComCredenciaisInvalidas()`
  - Usa fixture `credenciais.invalida` para preencher `#username` e `#senha`, e clica no botão "Entrar".

### Comandos de transferência (`cypress/support/commands/transferencia.js`)

- `cy.realizarTransferencia(contaOrigem, contaDestino, valor)`
  - Seleciona opções de conta de origem e destino e preenche o campo `#valor`, então clica no botão "Transferir".
  - Parâmetros:
    - `contaOrigem` (string): rótulo visível da conta na combo de origem.
    - `contaDestino` (string): rótulo visível da conta na combo de destino.
    - `valor` (string|number): valor a ser transferido.

### Comandos utilitários (`cypress/support/commands/common.js`)

- `cy.verificarMensagemNoToast(mensagem)`
  - Valida que o elemento `.toast` possui exatamente o texto `mensagem`.
- `cy.selecionarOpcaoNaComboBox(labelDoCampo, opcao)`
  - Encontra o campo a partir do `label[for="<id-do-campo>"]`, abre a combo e clica na opção desejada.
  - Parâmetros:
    - `labelDoCampo` (string): valor do atributo `for` do rótulo do campo (ex.: `conta-origem`).
    - `opcao` (string): texto visível da opção na lista.

## Configuração do Cypress

- Arquivo: `cypress.config.js`
  - `e2e.baseUrl`: `http://localhost:4000`
  - `reporter`: `cypress-mochawesome-reporter`
  - `video`: `false` (para habilitar vídeos, altere para `true`)

## Dicas e solução de problemas

- Certifique-se de que a aplicação Web esteja acessível em `baseUrl` (padrão: `http://localhost:4000`).
- Se precisar apontar para outro ambiente rapidamente, sobrescreva `baseUrl` pela linha de comando com `--config baseUrl=...`.
- Se o toast não aparecer, valide se o seletor `.toast` e os textos exibidos na aplicação não mudaram.
- Ao mudar portas/URLs da aplicação, atualize `cypress.config.js` ou os comandos de execução.

---

Feito para estudos na Mentoria 2.0, praticando automação de testes com Cypress, boas práticas de organização e relatórios executivos em HTML.
