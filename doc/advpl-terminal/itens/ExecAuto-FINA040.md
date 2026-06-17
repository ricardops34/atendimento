---
title: "ExecAuto FINA040"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-fina040/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:29"
---

# ExecAuto FINA040

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-fina040/

## Exemplo da Rotina

```advpl
MSExecAuto({|x,y| FINA040(x,y)}, aVetSE1, 3)
```

## Exemplo 1- Incluindo um título financeiro a receber

```advpl
//Prepara o array para o execauto
aVetSE1 := {}
aAdd(aVetSE1, {"E1_FILIAL",  FWxFilial("SE1"),  Nil})
aAdd(aVetSE1, {"E1_NUM",     cNumero,           Nil})
aAdd(aVetSE1, {"E1_PREFIXO", cPrefixo,          Nil})
aAdd(aVetSE1, {"E1_PARCELA", cParcela,          Nil})
aAdd(aVetSE1, {"E1_TIPO",    cTipo,             Nil})
aAdd(aVetSE1, {"E1_NATUREZ", cNatureza,         Nil})
aAdd(aVetSE1, {"E1_CLIENTE", cCliente,          Nil})
aAdd(aVetSE1, {"E1_LOJA",    cLoja,             Nil})
aAdd(aVetSE1, {"E1_NOMCLI",  cNomCli,           Nil})
aAdd(aVetSE1, {"E1_EMISSAO", dEmissao,          Nil})
aAdd(aVetSE1, {"E1_VENCTO",  dVencto,           Nil})
aAdd(aVetSE1, {"E1_VENCREA", dVencReal,         Nil})
aAdd(aVetSE1, {"E1_VALOR",   nValor,            Nil})
aAdd(aVetSE1, {"E1_VALJUR",  nValJuros,         Nil})
aAdd(aVetSE1, {"E1_PORCJUR", nPorcJuros,        Nil})
aAdd(aVetSE1, {"E1_HIST",    cHist,             Nil})
aAdd(aVetSE1, {"E1_MOEDA",   1,                 Nil})

    //Chama a rotina automática
    lMsErroAuto := .F.
    MSExecAuto({|x,y| FINA040(x,y)}, aVetSE1, 3)

    //Se houve erro, mostra o erro ao usuário e desarma a transação
    If lMsErroAuto
        MostraErro()
        DisarmTransaction()
    EndIf
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Rotina automática para criação e manipulação de Contas a Receber
