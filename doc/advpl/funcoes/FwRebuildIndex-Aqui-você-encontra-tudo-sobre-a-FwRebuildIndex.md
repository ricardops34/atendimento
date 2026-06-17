---
title: "FwRebuildIndex
Aqui você encontra tudo sobre a FwRebuildIndex"
function_name: "FwRebuildIndex"
doc_type: "function"
status: "published"
page_id: 573525303
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=573525303"
tdn_last_modified: "23 jul, 2025"
exported_at: "2026-06-03 09:58:46"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwRebuildIndex
Aqui você encontra tudo sobre a FwRebuildIndex

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=573525303

## ConteÃºdo

FwRebuildIndex
Aqui você encontra tudo sobre a FwRebuildIndex
Qual é o objetivo do FwRebuildIndex?
A rotina de rebuild de índices é responsável por atualizar os índices, estruturas entre outras informações de diversas tabelas da LIB do Protheus.
O que preciso saber antes de executar a FwRebuildIndex?
Por criar ou alterar índices e estruturas de tabelas, ela precisa ser executada de forma EXCLUSIVA, ou seja, sem que qualquer outro usuário acessando o sistema ou job esteja em execução.
O DbAccess possui armazenamento de cache, portanto é indicado que o mesmo seja reiniciado antes da execução.
Atenção!
Por se tratar de uma rotina que efetua manutenções nas estruturas das tabelas do banco de dados, recomendamos que seja feito um backup de segurança antes da execução da mesma.
Quando eu devo executar essa função?
A execução da FwRebuildIndex é indicada quando a estrutura de alguma tabela da LIB do Protheus sofreu alterações;
Quando for mencionado a sua execução em alguma documentação da LIB a fim de implementar ou implantar algum novo recurso.

Como Executo a FwRebuildIndex?
Para executar a mesma, basta chamar a função FwRebuildIndex diretamente no Programa Inicial do Smartclient, a mesma não exige parâmetros ou interação do usuário, após o término é exibida uma caixa de diálogo informando o sucesso da execução.

Exemplo de mensagem apresentada durante o processamento:

Após o processamento:
