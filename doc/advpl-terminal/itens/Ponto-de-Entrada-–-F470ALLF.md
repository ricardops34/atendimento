---
title: "Ponto de Entrada – F470ALLF"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f470allf/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:16:54"
---

# Ponto de Entrada – F470ALLF

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f470allf/

## Exemplo da Rotina

```advpl
User Function F470ALLF()
	...
Return lRet
```

## Exemplo 1- Retornando que irá considerar todas as filiais

```advpl
//Bibliotecas
#Include "Totvs.ch"

/*/{Protheus.doc} F470ALLF
Define o filtro de filial no FINR470 (Extrato Bancário)
@author Atilio
@since 20/11/2019
@version 1.0
@return lRet, .T. se for para trazer dados de todas as filiais e .F. se filtrar apenas a filial corrente
@type function
@see https://tdn.totvs.com/pages/releaseview.action?pageId=6071573
/*/

User Function F470ALLF()
	Local aArea := GetArea()
	Local lRet  := .T.

	RestArea(aArea)
Return lRet
```

## Exemplo 2- Mostrando uma pergunta pro usuário escolher se quer ver todas as filiais

```advpl
//Bibliotecas
#Include "Totvs.ch"

/*/{Protheus.doc} F470ALLF
Define o filtro de filial no FINR470 (Extrato Bancário)
@author Atilio
@since 20/11/2019
@version 1.0
@return lRet, .T. se for para trazer dados de todas as filiais e .F. se filtrar apenas a filial corrente
@type function
@see https://tdn.totvs.com/pages/releaseview.action?pageId=6071573
/*/

User Function F470ALLF()
	Local aArea := GetArea()
	Local lRet  := MsgYesNo("Deseja ver lançamento de todas as filiais?", "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. que define se o Extrato Bancário será exclusivo por filial ou não
