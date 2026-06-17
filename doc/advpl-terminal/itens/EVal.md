---
title: "EVal"
function_name: "EVal"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/eval/"
has_examples: true
example_count: 3
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:24"
---

# EVal

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/eval/

## Exemplo da Rotina

```advpl
EVal([Bloco de Código])
```

## Exemplo 1- Executando um bloco comum

```advpl
bBloco := {|| Alert("Teste")}

EVal(bBloco)
```

## Exemplo 2- Executando um bloco com passagem de parâmetro

```advpl
bAoQuadrado := { | nValor | nValor * nValor, Alert("Valor ao quadrado: " + cValToChar(nValor)) }

EVal(bAoQuadrado, 5)
```

## Exemplo 3- Executando um bloco com teste lógico se deu certo

```advpl
bCondicao := {|| TAB->CAMPO >= '000001' .And. ! TAB->(EoF())}

//Se a execução do bloco deu certo
If EVal( bCondicao )
	//...
EndIf
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Executa um bloco de códigos
