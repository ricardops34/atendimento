---
title: "HttpGet"
function_name: "HttpGet"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/httpget/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:54"
---

# HttpGet

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/httpget/

## Exemplo da Rotina

```advpl
xVariavel := HttpGet(cLink, cParametros, nTimeOut, aHeader, @cHeaderGet )
```

## Exemplo 1- Buscando dados do CNPJ

```advpl
cCNPJ      := "00000000000000"
cJson      := ""
cGetParms  := ""
cHeaderGet := ""
nTimeOut   := 200
aHeadStr   := {"Content-Type: application/json"}
oObjJson   := Nil

//Utiliza HTTPGET para retornar os dados da Receita Federal
cJson := HttpGet('https://www.receitaws.com.br/v1/cnpj/'+ cCNPJ, cGetParms, nTimeOut, aHeadStr, @cHeaderGet )

//Transformando a string JSON em Objeto
If FWJsonDeserialize(cJson,@oObjJson)
	cText := ""
	cText += "Abertura: "       + oObjJson:ABERTURA                                  + CRLF
	cText += "Bairro: "         + oObjJson:BAIRRO                                    + CRLF
	cText += "Capital Social: " + oObjJson:CAPITAL_SOCIAL                            + CRLF
	cText += "CEP: "            + oObjJson:CEP                                       + CRLF
	cText += "Data Situação: "  + oObjJson:DATA_SITUACAO                             + CRLF
	cText += "Natureza Jur.: "  + DecodeUTF8(oObjJson:NATUREZA_JURIDICA, "cp1252")}) + CRLF

	Alert(cText)
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Caio Henrique;

## Referências

- TDN

## Resumo

Faz download de algum conteúdo da internet
