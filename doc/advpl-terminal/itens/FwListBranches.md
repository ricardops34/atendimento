---
title: "FwListBranches"
function_name: "FwListBranches"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwlistbranches/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: "doc/advpl/funcoes/FwListBranches.md"
related_tdn_title: "FwListBranches"
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:20"
---

# FwListBranches

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwlistbranches/
> Referencia oficial relacionada: doc/advpl/funcoes/FwListBranches.md

## Exemplo 1- Abrindo a tela e selecionando

```advpl
#Include 'Protheus.ch'
#Include 'TbiConn.ch'
#Include 'TopConn.ch'

#Define ENTER Chr(13)+Chr(10)

User Function zCCHFil()

    Local aRet := {}
    Local n    := 0
    Local cRet := ''
    /*
    lCheckUser - Exibe apenas as filiais que o usuário possui acesso. Default: .T.
    lAllEmp    - Exibe todas as empresas do grupo ou apenas unidade de negócio
                 e filiais da empresa logada. Default: .F.
    lOnlySelect- Indica se o retorno da função irá considerar todos registros
                 apresentados ou apenas os registros marcados. Default: .T.
    aRetInfo   - Indica os campos que serão retornados no término da rotina.
                 Default: { 'FLAG', 'SM0_CODFIL', 'SM0_NOMRED', 'SM0_CGC', 'SM0_INSC', 'SM0_INSCM' }
                 Campos aceitos:
                'FLAG' - indica se o registro foi marcado ou não
                'SM0_CODFIL' - Código completo da filial
                'SM0_EMPRESA' - Código da empresa
                'SM0_UNIDNEG' - Código da unidade de negócio
                'SM0_FILIAL' - Código da filial
                'SM0_DESCEMP' - Nome da empresa
                'SM0_NOMRED' - Nome da filial
                'SM0_CGC' - CNPJ
                'SM0_INSC' - Inscrição Estadual
                'SM0_INSCM' - Inscrição Municipal
    */

    aRet := FwListBranches(.T.,.T.,.T.,{'FLAG','SM0_EMPRESA','SM0_CODFIL','SM0_NOMRED'})

    For n := 1 To Len(aRet)
        cRet += 'Empresa:  '+aRet[n][2]+ENTER
        cRet += 'Filial:   '+aRet[n][3]+ENTER
        cRet += 'Nome Red: '+aRet[n][4]+ENTER
    Next

    MsgInfo(cRet)

Return ( Nil )
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Caio Souza;

## Resumo

Abre uma tela para seleção de Filiais
