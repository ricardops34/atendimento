---
title: "Ponto de Entrada – QAD150EN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-qad150en/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:16"
---

# Ponto de Entrada – QAD150EN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-qad150en/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  QAD150EN                                                                                      |
 | Desc:  Personaliza mensagem de e-Mail no Agenda Auditoria                                            |
 | Links: http://tdn.totvs.com/display/public/mp/QAD150EN+-+Personalizar+Mensagem+de+E-mail             |
 *------------------------------------------------------------------------------------------------------*/

User Function QAD150EN()
	Local cMens := ""
	Local cDestino := Alltrim(GetMV("MV_X_EMAIL")) +";"
	Local nLinha := 0

	//Cabeçalho do email
	cMens := "<html>"
	cMens += "<head><title>Teste</title></head>"

	//Corpo do e-Mail
	cMens += "<body>"
	//Dados do registro
	cMens+= '<b>Auditoria:</b> '+QUA->QUA_NUMAUD+'<br>'
	//Dados dos itens
	cMens+= '<table>'
	cMens+= '  <tr><td><b>Dados Relacionados:</b><br><hr>'
	For nLinha := 1 to Len(oGet:aCols)
		cMens += '- <b>Destinatário: </b>'+oGet:aCols[nLinha,3]+'<br>'
		cMens += '- <b>e-Mail: </b>'+oGet:aCols[nLinha,4]+'<br>'
		cMens += '- <b>Auditor: </b>'+AllTrim(Posicione("QAA", 1, FWxFilial("QAA")+oGet:aCols[nLinha,6], "QAA_NOME"))+'<br>'
		cMens += '- <b>Início: </b>'+dToC(oGet:aCols[nLinha,8])+" - "+oGet:aCols[nLinha,9]+'<br>'
		cMens += '- <b>Fim: </b>'+dToC(oGet:aCols[nLinha,10])+" - "+oGet:aCols[nLinha,11]+'<br>'
		cMens += '- <b>Telefone: </b>'+oGet:aCols[nLinha,12]+'<br><hr>'
	Next nLinha
	cMens+= '  </td></tr>'
	cMens+= '</table>'
	//Finalizando
	cMens += "</body>"
	cMens += "</html>"

	Alert(cMens)
Return cMens
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada QAD150EN.
