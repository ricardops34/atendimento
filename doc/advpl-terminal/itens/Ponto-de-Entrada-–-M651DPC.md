---
title: "Ponto de Entrada – M651DPC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m651dpc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:17:47"
---

# Ponto de Entrada – M651DPC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m651dpc/

## Exemplo da Rotina

```advpl
User Function M651DPC()
	//...
Return lRet
```

## Exemplo 1- Valida o duplo clique ao firmar OP

```advpl
#INCLUDE "PROTHEUS.CH"

//=================================================================================
/*/{Protheus.doc} M651DPC
P.E permite criar validações no duplo click da MarkBrow na tela de Firmar OP [MATA651]

@type       function
@author     Thiago.Andrrade
@since      30/05/2019
@version    1.0
@return     .T. -> Permite Firmar OP
            .F. -> Não permite Firmar OP
/*/
//=================================================================================

User Function M651DPC()

Local lRet := .T.
Local cNomeUsr := Alltrim(cUSERNAME)

If cEmpAnt == '01'
    If !substr(cNomeUsr,1,4) $ "PCP2/PCP4/PCP5/PCP6/PCP9/AL18/AL17"
        MsgStop("Usuario sem permissão para Firmar OP!", "Atenção")
        lRet   := .F.
    Endif
Endif

Return(lRet)
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Thiago.Andrrade;

## Referências

- TDN

## Resumo

P.E permite criar validações no duplo click da MarkBrow na tela de Firmar OP (MATA651)
