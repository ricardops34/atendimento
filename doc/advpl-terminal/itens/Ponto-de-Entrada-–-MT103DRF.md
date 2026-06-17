---
title: "Ponto de Entrada – MT103DRF"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt103drf/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:18:13"
---

# Ponto de Entrada – MT103DRF

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt103drf/

## Exemplo da Rotina

```advpl
User Function MT103DRF()
	//...
Return aRet
```

## Exemplo 1- Alterando a DIRF e as Retenções de Impostos

```advpl
#Include "Protheus.ch"

/*/{Protheus.doc} MT103DRF
Ponto de Entrada para alterar o Campo DIRF e Código de Retenção dos Impostos
na Classificação do Documento de Entrada
@author Caio César Henrique
@since 29/05/2019
@version 1.0
@type function
@example U_MT103DRF()
/*/

User Function MT103DRF()

    /* Declaração de Variáveis Locais
       - Não há obrigatoriedade de recebimento dos dados com PARAMIXB
       - Todavia, se considerar necessário, segue ordem:
       - PARAMIXB[1]    Numérica   Combobox com os valores (1=Sim; 2=Não)
       - PARAMIXB[2]    Array       Código da Retenção
       - PARAMIXB[3]    Objeto      Objeto combo passado por referência
       - PARAMIXB[4]    Objeto      Objeto Textbox passado por referência
    */
    Local aImpRet := {}
    Local nValor  := 1
    Local cCodRet := "5952"

    /* Neste caso, altero para "1-Sim" e Cód Retenção "5952"
       apenas para os Impostos PIS, COFINS e CSLL
       P.S.: Ponto de entrada válido apenas para IRPF, ISS, PIS, COFINS e CSLL */
    aAdd(aImpRet,{"PIS", nValor , "5952"})
    aAdd(aImpRet,{"COF", nValor , "5952"})
    aAdd(aImpRet,{"CSL", nValor , "5952"})

/* Retorna as mudanças para o fonte padrão */
Return ( aImpRet )
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função e documentação enviada por Caio Henrique;

## Referências

– TDN

## Resumo

Ponto de Entrada para alterar o Campo DIRF e Código de Retenção dos Impostos
