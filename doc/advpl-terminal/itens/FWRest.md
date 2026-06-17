---
title: "FWRest"
function_name: "FWRest"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "webservices"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwrest/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:30"
---

# FWRest

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwrest/

## Exemplo 1- Enviando um produto

```advpl
//Cabeçalho
	aHeadPar := {}
	aAdd(aHeadPar, "Content-Type: application/json")

	//Conteúdo JSON
	cTexto := '{'                                                                        + CRLF
	cTexto += '  "idEmp": '     + cIDEmpr                                        + ','
	cTexto += '  "codProd": "' + cProduto                                      + '",'
	cTexto += '  "obs": "'      + cObserv                                        + '"'
	cTexto += '}'                                                                        + CRLF

	//Monta a conexão com o servidor REST
	oRestClient := FWRest():New(cSilURL) // Ex.: "http://aaaaaaa/v1"
	oRestClient:setPath(cSilEnd) // Ex.: "/produtos"

	//Definindo o parâmetro a ser usado no POST
	cTexto := FWNoAccent(cTexto)
	oRestClient:SetPostParams("["+cTexto+"]")

	//Publica a alteração, e caso não dê certo, mostra erro
	If ! oRestClient:Post(aHeadPar)
		Aviso('Atenção', 'Houve erro na atualização no servidor!' + CRLF + ;
			'Contate o Administrador!' + CRLF + ;
			"Erro: " + oRestClient:GetLastError() + CRLF + CRLF + ;
			"Result: " + oRestClient:GetResult(), {'OK'}, 03)
	Else
		//Alert("Exportação OK: "+oRestClient:GetResult())
	EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Efetua uma transação utilizando REST
