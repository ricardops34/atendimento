---
title: "Macro Substituição"
function_name: "Macro"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/macro-substituicao/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:08"
---

# Macro Substituição

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/macro-substituicao/

## Exemplo da Rotina

```advpl
&("Comando(s)")
```

## Exemplo 1- Usando a Macrosubstituição em uma conta

```advpl
cExpressao := " 7 + 8 - 3 "
nValor := &(cExpressao)
```

## Exemplo 2- Criando várias variáveis e depois mostrando o conteúdo delas

```advpl
For nAtual := 1 To 20
	&("xVar" + cValToChar(nAtual)) := nAtual * 100
Next

For nAtual := 1 To 20
	cNomeVar := "xVar" + cValToChar(nAtual)
	Alert("Variável [" + cNomeVar + "] é igual a [" + cValToChar(&(cNomeVar)) + "]")
Next
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Executa um conteúdo entre Aspas e faz a substituição dele para o AdvPL
