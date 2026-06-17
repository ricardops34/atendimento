---
title: "MPUserHasAccess"
function_name: "MPUserHasAccess"
doc_type: "function"
status: "published"
page_id: 239034245
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=239034245"
tdn_last_modified: "17 mar, 2025"
exported_at: "2026-06-03 09:58:57"
has_parameters: false
has_example: false
section_keys: [linha_de_produto, segmento, m_dulo, fun_o, conversores_e_par_metros, observacoes]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MPUserHasAccess

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=239034245

## Linha de Produto

Protheus

## Segmento

Todos

## Módulo

Todos

## Função

MPUserHasAccess

## Conversores e Parâmetros

cFunction - Nome da função(de menu) que deseja verificar o acesso, por exemplo MATA030
nOpc - Código da posição do array do arotina que será avaliado
cCodUser - Código do usuário, caso não seja informado, será avaliado o usuário corrente logado.
lShowMsg - Indica se deve apresentar mensagem padrão quando o usuário não possuir acesso
lAudit - Indica se deve logar na auditoria caso o usuário não tenha acesso. Para mais informações sobre o log gerado, segue link do relatório de auditoria: Auditoria Dicionário (APCFGR20 - SIGACFG)Auditoria Dicionário (APCFGR20 - SIGACFG)
cFunName - Informe o nome da função agrupada para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.
nOperation - Informe um valor numérico da operação para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.

## Observações

Seguem abaixo os exemplos de tratamento da função utilizando o Controle de Acesso e Controle de Privilégio.

CONTROLE DE ACESSO

Para este caso, o sistema não validará os acessos de cada funcionalidade dentro do sub-menu, por exemplo:
Dentro da rotina de “Cadastro de Produtos”, existe a opção “Relacionadas” com duas opções: "Adic. Tab. Preço" e "Conhecimento".
Para este caso, a função MPUserHasAccess deverá ser utilizada conforme o exemplo abaixo:
MPUserHasAccess(“MATA010”, 9, ”000001”, .F., .T.,/* Reservado */, 1 /*Analisar sub-rotina*/)

Parâmetro 1: Nome da função (de menu) que deseja verificar o acesso, por exemplo MATA010.
Parâmetro 2: Código da posição do array do arotina que será avaliado.
Parâmetro 3: Código do usuario, caso não seja informado, sera avaliado o usuario corrente logado.
Parâmetro 4: Indica se deve apresentar mensagem padrão quando o usuário não possuir acesso.
Parâmetro 5: Indica se deve logar na auditoria caso o usuário não tenha acesso.
Parâmetro 6: Informe o nome da função agrupada para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.
Parâmetro 7: Informe um valor numérico da operação para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.

Desta forma, todas as rotinas dentro da opção “Relacionadas” serão validadas de uma única vez.

ROTINA DE PRIVILÉGIOS

Para este caso, o sistema validará cada funcionalidade dentro do sub-menu, respeitando os parâmetros conforme as opções da grid “Funcionalidades das Transações/Rotinas”, por exemplo:
Dentro da rotina de “Cadastro de Produtos”, existe a opção “Relacionadas” com duas opções: "Adic. Tab. Preço" e "Conhecimento".
Para este caso, a função MPUserHasAccess deverá ser utilizada conforme o exemplo abaixo:

Validando a funcionalidade “Adic. Tab. Preço”

MPUserHasAccess(“MATA010”, 11, ”000001”, .F., .T., "CRMA160()"/*Função Sub-menu*/, 3 /*Definição da Operação*/)

Validando a funcionalidade “Conhecimento”

MPUserHasAccess(“MATA010”, 12, ”000001”, .F., .T., "A010doc()"/*Função Sub-menu*/, 6 /*Definição da Operação*/)

Desta forma, todas as rotinas dentro da opção “Relacionadas” serão validadas separadamente.

Parâmetro 1: Nome da função (de menu) que deseja verificar o acesso, por exemplo MATA010.
Parâmetro 2: Código da posição conforme a coluna “Item” marcada na imagem acima.
Parâmetro 3: Código do usuário, caso não seja informado, será avaliado o usuário corrente logado.
Parâmetro 4: Indica se deve apresentar mensagem padrão quando o usuário não possuir acesso.
Parâmetro 5: Indica se deve logar na auditoria caso o usuário não tenha acesso.
Parâmetro 6: Informe o nome da função agrupada para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.
Parâmetro 7: Informe um valor numérico da operação para ativar a validação em caso de sub-menu. Caso não seja sub-menu, passar Nil com parâmetro ou não informar.

Funções que não constam nos menus:
Rotinas que não constam no menu também são validadas em relação aos privilégios, logo se uma rotina X for pesquisada, os retornos podem ser os seguintes:
Negado caso exista privilégio negando ou grupo default.
Permitido em qualquer outra situação.
Esse comportamento deve-se pelo fato da função validar os privilégios, e a leitura é feita independente da rotina constar em menus ou não.
