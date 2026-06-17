---
title: "FWTemporaryTable"
function_name: "FWTemporaryTable"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwtemporarytable/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:32"
---

# FWTemporaryTable

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwtemporarytable/

## Exemplo da Rotina

```advpl
oTempTable := FWTemporaryTable():New("ALIAS")
oTempTable:SetFields( aFields )
oTempTable:Create()

/*
	Aqui você faz as suas customizações, usando seu alias, por exemplo
	Alert( ALIAS->NOME_DO_CAMPO )
*/

oTempTable:Delete()
```

## Exemplo 1- Criando uma tabela temporária com 3 campos

```advpl
//Cria a temporária
oTempTable := FWTemporaryTable():New("ALIAS_XPTO")

//Adiciona no array das colunas as que serão incluidas (Nome do Campo, Tipo do Campo, Tamanho, Decimais)
aFields := {}
aAdd(aFields, {"NOME",    "C", 50, 0})
aAdd(aFields, {"VALOR",   "N",  8, 2})
aAdd(aFields, {"EMISSAO", "D",  8, 0})

//Define as colunas usadas
oTempTable:SetFields( aFields )

//Efetua a criação da tabela
oTempTable:Create()

/*
	Aqui você faz as suas customizações, usando seu alias, por exemplo
	Alert( ALIAS_XPTO->NOME)
*/

oTempTable:Delete()
```

## Exemplo 2- Criando uma tabela temporária com 4 campos e um índice

```advpl
//Cria a temporária
oTempTable := FWTemporaryTable():New("ALIAS_XPTO")

//Adiciona no array das colunas as que serão incluidas (Nome do Campo, Tipo do Campo, Tamanho, Decimais)
aFields := {}
aAdd(aFields, {"FILIAL",  "C",  2, 0})
aAdd(aFields, {"NOME",    "C", 50, 0})
aAdd(aFields, {"VALOR",   "N",  8, 2})
aAdd(aFields, {"EMISSAO", "D",  8, 0})

//Define as colunas usadas
oTempTable:SetFields( aFields )

//Cria índice com colunas setadas anteriormente
oTempTable:AddIndex("1", {"FILIAL", "NOME"} )

//Efetua a criação da tabela
oTempTable:Create()

/*
	Aqui você faz as suas customizações, usando seu alias, por exemplo
	Alert( ALIAS_XPTO->NOME)
*/

oTempTable:Delete()
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Cria uma tabela temporária para ser usada no sistema
