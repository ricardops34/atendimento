---
title: "ShellExecute"
function_name: "ShellExecute"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/shellexecute/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:13"
---

# ShellExecute

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/shellexecute/

## Exemplo da Rotina

```advpl
ShellExecute([Ação], [Arquivo / Programa],  [], [Diretório], [Opção (1 = Normal)])
```

## Exemplo 1- Abrindo um arquivo html

```advpl
cPasta   := "C:\totvs\temp\"
cArquivo := "arquivo.html"

ShellExecute("OPEN", cArquivo, "", cPasta, 1)
```

## Exemplo 2- Abrindo o outlook com um novo email na tela

```advpl
cExecute := "/c ipm.note /m  teste@empresa.com "

ShellExecute("OPEN", "outlook.exe", cExecute, "", 1)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Executa um comando do sistema operacional via AdvPL
