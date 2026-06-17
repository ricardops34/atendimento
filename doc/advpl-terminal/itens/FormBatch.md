---
title: "FormBatch"
function_name: "FormBatch"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "telas-objetos"
source_url: "https://terminaldeinformacao.com/knowledgebase/formbatch/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:04"
---

# FormBatch

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/formbatch/

## Exemplo da Rotina

```advpl
FormBatch("Título", aTextos, aBotões)
```

## Exemplo 1- Criando uma tela simples com 3 botões

```advpl
Local aSays        := {}
Local aButtons     := {}
Local lOk          := .F.
Local cPerg        := "X_SUA_PERG"

//Popula as linhas que serão mostradas na tela
aAdd(aSays, "Esse programa tem como objetivo gerar")
aAdd(aSays, "um arquivo .csv com a lista de contatos.")

//Botões da tela, cada botão tem um Bloco de Código
aAdd(aButtons, { 5, .T., {|| Pergunte(cPerg, .T. ) } } )
aAdd(aButtons, { 1, .T., {|| lOk := .T., FechaBatch() }} )
aAdd(aButtons, { 2, .T., {|| lOk := .F., FechaBatch() }} )

//Chama a tela principal
FormBatch("Importação de Contatos", aSays, aButtons)

//Se foi confirmado a tela
If lOk
	//Processamento
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Cria uma tela com botões para execuções
