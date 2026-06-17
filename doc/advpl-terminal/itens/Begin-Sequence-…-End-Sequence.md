---
title: "Begin Sequence … End Sequence"
function_name: "Begin"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/begin-sequence-end-sequence/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:24"
---

# Begin Sequence … End Sequence

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/begin-sequence-end-sequence/

## Exemplo da Rotina

```advpl
Begin Sequence
//Comandos
End Sequence
```

## Exemplo 1- Executando uma soma e vendo se irá mostrar erro

```advpl
cError   := ""
bError   := ErrorBlock({ |oError| cError := oError:Description})

//Inicio a utilização da tentativa
Begin Sequence
	nVariavel := 1 + "A"
End Sequence

//Restaurando bloco de erro do sistema
ErrorBlock(bError)

//Se houve erro, será mostrado ao usuário
If ! Empty(cError)
	MsgStop("Houve um erro na fórmula digitada: "+CRLF+CRLF+cError, "Atenção")
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

– BlackTDN

## Resumo

Tratativa de funções sem gerar Error Log (similar ao Try Catch)
