---
title: "PLS260LF"
function_name: "PLS260LF"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/pls260lf/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:16:07"
---

# PLS260LF

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/pls260lf/

## Exemplo da Rotina

```advpl
User Function PLS260LF()
    //...
Return lRet
```

## Exemplo 1- Dispara um e-Mail após efetuar as tratativas do sistema

```advpl
User Function PLS260LF()
    Local aArea  := GetArea()
    Local lRet   := .T.

    //Disparando e-mail mandando notificações
	fEnvMail()

    RestArea(aArea)
Return lRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Cássio Winkler;

## Referências

- TDN

## Resumo

P.E. após a gravação do bloqueio ou desbloqueio de Família
