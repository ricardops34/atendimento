---
title: "WaitRun"
function_name: "WaitRun"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/waitrun/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:37"
---

# WaitRun

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/waitrun/

## Exemplo da Rotina

```advpl
WaitRun([Programa ou Instrução], [Opção])
```

## Exemplo 1- Executando um .bat

```advpl
cCaminho  := "C:\totvs\temp\"
cPrograma := "teste.bat"

WaitRun(cCaminho + cPrograma, 2)
```

## Exemplo 2- Copiando um arquivo para um caminho de rede

```advpl
cOrigem  := "C:\totvs\temp\"
cArquivo := "relatorio.pdf"
cDestino := "\\SERVIDOR-BELUGA\pasta_relatorios\"

WaitRun("XCOPY " + cOrigem + cArquivo + '  ' + cDestino +" /y")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Executa um programa no sistema operacional e aguarda seu encerramento
