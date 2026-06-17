---
title: "Atributo lOptionConfig"
function_name: "Atributo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/atributo-loptionconfig/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:12:10"
---

# Atributo lOptionConfig

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/atributo-loptionconfig/

## Exemplo da Rotina

```advpl
oBrowse:lOptionConfig := .F.
aAdd(oBrowse:aButtonsOrder, "Opção 1")
aAdd(oBrowse:aButtonsOrder, "Opção 2")
```

## Exemplo 1- Definindo os botões que serão visualizados e a ordem deles

```advpl
User Function zTeste()
	Local aArea   := GetArea()
	Local oBrowse

	//Instânciando FWMBrowse - Somente com dicionário de dados
	oBrowse := FWMBrowse():New()

	//Setando a tabela de cadastro
	oBrowse:SetAlias("Z42")

	//Setando a descrição da rotina
	oBrowse:SetDescription(cTitulo)

	//Setando botões que serão exibidos
	oBrowse:lOptionConfig := .F.
	aAdd(oBrowse:aButtonsOrder, "Incluir")
	aAdd(oBrowse:aButtonsOrder, "Alterar")
	aAdd(oBrowse:aButtonsOrder, "Imprimir")
	aAdd(oBrowse:aButtonsOrder, "Visualizar")

	//Ativa a Browse
	oBrowse:Activate()

	RestArea(aArea)
Return Nil
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Altera o atributo para definir os botões que serão exibidos e a ordem deles
