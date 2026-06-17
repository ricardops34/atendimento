---
title: "Ponto de Entrada – F550REPOS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f550repos/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:59"
---

# Ponto de Entrada – F550REPOS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f550repos/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F550REPOS                                                    |
 | Desc:  Valida Reposição Manutenção Caixinha                         |
 *---------------------------------------------------------------------*/

User Function F550REPOS()
	Local aArea:= GetArea()
	Local lRet := .T.
	Local cBco := SET->ET_BANCO
	Local cAge := SET->ET_AGEBCO
	Local cCnt := SET->ET_CTABCO

	lRet := MsgYesNo("Continuar? Banco: "+cBco, "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F550REPOS.
