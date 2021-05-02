module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Uma nova funcionalidade' },
    { value: 'fix', name: 'fix:      Correção de algum bug' },
    { value: 'docs', name: 'docs:     Apenas documentações foram atualizadas' },
    {
      value: 'style',
      name:
        'style:    Alterações que não afetam a semântica do código\n            (espaços, formatação, pontuações faltando, etc)',
    },
    {
      value: 'refactor',
      name:
        'refactor: Alteração que não corrige um bug nem adiciona uma funcionalidade',
    },
    {
      value: 'perf',
      name: 'perf:     Alterações para melhoria do desempenho',
    },
    { value: 'test', name: 'test:     Adicionando testes que faltavam' },
    {
      value: 'chore',
      name:
        'chore:    Alterações no processo de build ou \n            ferramentas por ex. para geração de documentação',
    },
    { value: 'revert', name: 'revert:   Um commit foi revertido' },
    { value: 'WIP', name: 'WIP:      Trabalho em progresso' },
  ],

  /**
   * scopes
   * @type string[]
   * @description Especifique os escopos de seu projeto específico.
   * @example
   * para algum sistema bancário: ["contas", "pagamentos"].
   * Para outro aplicativo de viagem: ["reservas", "pesquisar", "perfil"]
   */
  scopes: [
    'web-profile',
    'web-core',
    'web-phone',
    'web-recorder',
    'node-server',
    'node-client',
    'peer-signaling',
    'peer-core',
    'peer-client',
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,

  /**
   * ticketNumberPrefix
   * @description Define o prefixo personalizado para o número do rodapé.
   * @default 'ISSUES CLOSED:'
   */
  ticketNumberPrefix: 'TICKET-',

  /**
   * breakingPrefix
   * @description  Defina um prefixo personalizado para o bloco de alteração de quebra em mensagens de confirmação.
   * @default 'BREAKING CHANGE:'
   */
  // breakingPrefix,

  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /**
   * scopeOverrides
   * @description Use quando quiser substituir os escopos de um tipo específico de confirmação. O exemplo abaixo especifica os escopos quando o tipo é fix:
   * @example
   * scopeOverrides: {
   *   fix: [
   *     {name: 'merge'},
   *     {name: 'style'},
   *     {name: 'e2eTest'},
   *     {name: 'unitTest'}
   *   ]
   * }
   */
  // scopeOverrides,

  /*
  scopeOverrides: {
    fix: [

      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: 'Selecione o tipo de alteração que você está comitando:',
    scope: '\nSelecione o ESCOPO desta alteração (optional):',
    // used if allowCustomScopes is true
    customScope: '\nInforme Qual o ESCOPO desta alteração:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body:
      'Escreva uma descrição mais detalhada da alteração (optional). Use "|" para quebras de linha:\n',
    breaking: 'Listar quaisquer BREAKING CHANGES (opcional):\n',
    footer:
      'Liste quaisquer conclusões de ISSUES por esta alteração (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Tem certeza de que deseja continuar com o commit acima?',
  },

  /**
   * allowCustomScopes
   * @type boolean
   * @description adiciona a opção customde seleção de escopo para que você ainda possa digitar um escopo se precisar.
   * @default false
   */
  allowCustomScopes: true,

  /**
   * allowBreakingChanges
   * @type string[]
   * @description Lista de tipos de commit que você gostaria de responder à pergunta breaking changesolicitada.
   * @example ['feat', 'fix'].
   */
  allowBreakingChanges: ['feat', 'fix'],

  // skip any questions you want
  /**
   * skipQuestions
   * @description Lista de perguntas que você deseja ignorar.
   * @example ['body','footer']
   * @type string[]
   */
  skipQuestions: ['body'],

  /**
   * appendBranchNameToCommitMessage
   * @description Se você usar cz-customizablecom cz-customizable-ghooks, pode obter o nome do branch automaticamente anexado à mensagem de confirmação. Isso é feito por um gancho de confirmação em cz-customizable-ghooks. Esta opção foi adicionada em cz-customizable-ghooks, v1.3.0.
   * @default true
   */
  // appendBranchNameToCommitMessage,

  /**
   * subjectLimit
   * {number, default 100}
   * Este é o limite do assunto.
   * Exemplo: this is a new featureoufix a bug
   */
  subjectLimit: 100,

  /**
   * subjectSeparator
   * @description Este é o separador de assunto.
   * @example feat: this is a new feature
   * @type string
   * @default :
   */
  // subjectSeparator

  /**
   * typePrefix
   * @type string
   * @default ''
   * @description Este é o prefixo do tipo de confirmação.
   * @example
   * config:, { typePrefix: '[' }
   * result: [feat: this is a new feature
   *
   */
  // typePrefix

  /**
   * typePrefix
   * @type string
   * @default ''
   * @description Este é o sufixo do tipo de confirmação.
   * @example
   * config:, { typePrefix: '[', typeSuffix: ']', subjectSeparator: ' ' }
   * result: [feat] this is a new feature
   *
   */
  // typeSuffix

  /**
   * breaklineChar
   * @type string
   * @default
   * default '|'
   */
  // breaklineChar: '|', // It is supported for fields body and footer.

  /**
   * @type boolean
   * @default false
   * @description Capitaliza a primeira letra do assunto se definido comotrue
   */
  // upperCaseSubject,

  /**
   * @type string
   * @default 'ISSUES CLOSED:'
   * @description Defina um prefixo personalizado para o bloco de rodapé nas mensagens de confirmação. Defina como uma string vazia para remover o prefixo.
   */
  // footerPrefix : 'ISSUES CLOSED:',

  /**
   * askForBreakingChangeFirst
   * @type boolean
   * @default false
   * @description Ele pede a alteração da quebra como primeira pergunta quando definido paratrue
   */
  // askForBreakingChangeFirst : true, // default is false
}
