---
title: "AxPesqui"
function_name: "AxPesqui"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "cadastros"
source_url: "https://terminaldeinformacao.com/knowledgebase/axpesqui/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:20"
---

# AxPesqui

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/axpesqui/

## Exemplo da Rotina

```advpl
AxPesqui()
```

## Exemplo 1- Pegando a quantidade de uma tabela

```advpl
//Abre o cadastro de produtos, e chama a pesquisa
DbSelectArea("SB1")
nPesq := AxPesqui()

//Se a Pesquisa foi confirmada, mostra o produto escolhido
If nPesq == 1

	Alert("Produto escolhido foi " + SB1->B1_COD)

EndIf
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Abre a tela de pesquisar registro
