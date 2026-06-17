---
title: "AxCadastro"
function_name: "AxCadastro"
doc_type: "function"
status: "published"
page_id: 235322181
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=235322181"
tdn_last_modified: "16 abr, 2019"
exported_at: "2026-06-03 09:58:31"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# AxCadastro

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=235322181

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cAlias | Caracter | Alias da Tabela cadastrada no dicionário (SX2) que será baseada a mBrowse. | N |
| cTitle | Array of Record | Título da janela. | N |
| cDel | Array of Record | Função a ser executada ao deletar o registro. | N |
| cOk | Array of Record | Função a ser executada ao clicar no botão OK para gravar o registro(inclusão e alteração). | N |
| aRotAdic | Array of Record | Array contendo as rotinas adicionais para ser acrescentado ao array aRotina. | N |
| bPre | Array of Record | Codeblock a ser executado antes da abertura do diálogo de inclusão, alteração ou exclusão. | N |
| bOK | Array of Record | Codeblock a ser executado ao clicar no botão OK do diálogo de inclusão, alteração ou exclusão. | N |
| bTTS | Array of Record | Codeblock a ser executado durante a transação de inclusão, alteração ou exclusão. | N |
| bNoTTS | Array of Record | Codeblock a ser executado após a transação de inclusão, alteração ou exclusão. | N |
| aAuto | Array of Record | Array com os campos a serem considerados pela rotina automática. | N |
| nOpcAuto | Array of Record | Numero da opção selecionada (Inclusão, Alteração, Exclusão, Visualização) para a rotina automática. | N |
| aButtons | Array of Record | Array contendo os botões da EnchoiceBar com a seguinte estrutura: aButtons[1][1] – Nome do arquivo da imagem do botão.aButtons[1][2] – Bloco de execução.aButtons[1][3] – Mensagem de exibição no ToolTip.aButtons[1][4] – Nome do botão. | N |
| aACS | Array of Record | Array que substituí o controle de acessos das funções básicas do aRotina (Pesquisar, Visualizar, Incluir, Alterar, Excluir).
Ex: aACS := { , , , ,3  }
No exemplo acima a opção de excluir irá respeitar o 3º acesso da lista de acessos do usuário conforme link abaixo:
Relação de Acessos x Rotina | N |
| cTela | Array of Record | Nome da variável tipo "private" que a enchoice utilizará no lugar da variável aTela. | N |
| lMenuDef | Lógico | Indica se o Menudef padrão da função AxCadastro será criado. | .T. |
