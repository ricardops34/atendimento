---
title: "Ponto de Entrada – SDULOGIN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sdulogin/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:25"
---

# Ponto de Entrada – SDULOGIN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sdulogin/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  SDULogin                                                                                      |
 | Desc:  Ponto de Entrada ao abrir o APSDU / MPSDU                                                     |
 | Links: http://tdn.totvs.com/display/public/mp/SDULogin+-+Entrada+e+acesso                            |
 *------------------------------------------------------------------------------------------------------*/

User Function SDULogin()
	Local lRet  := .T.
	Local cUser := ParamIXB

	//Mostrando mensagem ao usuário logado
	MsgInfo("Bem vindo "+cUser, "Atenção")
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada SDULOGIN.
