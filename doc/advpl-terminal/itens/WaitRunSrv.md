---
title: "WaitRunSrv"
function_name: "WaitRunSrv"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/waitrunsrv/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:38"
---

# WaitRunSrv

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/waitrunsrv/

## Exemplo da Rotina

```advpl
WaitRunSrv([Programa / Instrução], [Esperar o término ou não], [Diretório do Servidor])
```

## Exemplo 1- Executando um programa no Servidor do Appserver

```advpl
//Chama a montagem dos gráficos
lWait       := .T.
cPasta      := "C:\totvs\temp\"
cCommand    := "programa_cria_grafico.bat"

If ! WaitRunSrv( cPasta + cCommand, lWait , "C:\" )
	ConOut("WaitRunSRV - Erro na geracao do gráfico: " + Time())
Else
	ConOut("WaitRunSRV - Grafico OK: " + Time())
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Executa um programa no sistema operacional no servidor da aplicação
