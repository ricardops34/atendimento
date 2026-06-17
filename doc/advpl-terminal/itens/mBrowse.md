---
title: "mBrowse"
function_name: "mBrowse"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "cadastros"
source_url: "https://terminaldeinformacao.com/knowledgebase/mbrowse/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:11"
---

# mBrowse

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/mbrowse/

## Exemplo da Rotina

```advpl
mBrowse([Linha inicial], [Coluna Inicial], [Linha Final], [Coluna Final], "ALIAS")
```

## Exemplo 1- Criando uma tela para cadastro de uma tabela customizada

```advpl
User Function zBeluga()
	Local aArea       := GetArea()
	Local cTabela     := "ZZZ"
	Private cCadastro := "Título do Cadastro"
	Private aRotina   := {}

	//Montando o Array aRotina, com funções que serão mostradas no menu
	aAdd(aRotina,{"Pesquisar",  "AxPesqui", 0, 1})
	aAdd(aRotina,{"Visualizar", "AxVisual", 0, 2})
	aAdd(aRotina,{"Incluir",    "AxInclui", 0, 3})
	aAdd(aRotina,{"Alterar",    "AxAltera", 0, 4})
	aAdd(aRotina,{"Excluir",    "AxDeleta", 0, 5})

	//Selecionando a tabela e ordenando
	DbSelectArea(cTabela)
	(cTabela)->(DbSetOrder(1))

	//Montando o Browse
	mBrowse(6, 1, 22, 75, cTabela)

	//Encerrando a rotina
	(cTabela)->(DbCloseArea())
	RestArea(aArea)
Return
```

## Exemplo 2- Criando uma tela para cadastro de uma tabela customizada, com funções especificas no menu e legenda

```advpl
User Function zBeluga()
	Local aArea       := GetArea()
	Local cTabela     := "ZZZ"
	Private aCores    := {}
	Private cCadastro := "Título do Cadastro"
	Private aRotina   := {}

	//Montando o Array aRotina, com funções que serão mostradas no menu
	aAdd(aRotina,{"Pesquisar",  "AxPesqui", 0, 1})
	aAdd(aRotina,{"Visualizar", "AxVisual", 0, 2})
	aAdd(aRotina,{"Incluir",    "AxInclui", 0, 3})
	aAdd(aRotina,{"Alterar",    "AxAltera", 0, 4})
	aAdd(aRotina,{"Excluir",    "AxDeleta", 0, 5})
	aAdd(aRotina,{"* Função A", "u_zFuncA", 0, 8})
	aAdd(aRotina,{"* Função B", "u_zFuncB", 0, 8})

	//Montando as cores da legenda
	aAdd(aCores,{"ZZZ_CAMPO == '1' ", "BR_VERDE" })
	aAdd(aCores,{"ZZZ_CAMPO == '2' ", "BR_VERMELHO" })

	//Selecionando a tabela e ordenando
	DbSelectArea(cTabela)
	(cTabela)->(DbSetOrder(1))

	//Montando o Browse
	mBrowse(6, 1, 22, 75, cArquivo, , , , , , aCores )

	//Encerrando a rotina
	(cTabela)->(DbCloseArea())
	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Monta um browse para cadastro de informações
