---
title: "Ponto de Entrada – M461COR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m461cor/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:17:43"
---

# Ponto de Entrada – M461COR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m461cor/

## Exemplo da Rotina

```advpl
User Function M461COR()
	//...
Return aCores
```

## Exemplo 1- Ponto de Entrada para alterar a cor de status no browse da Nota Fiscal de Saída

```advpl
/* Bibliotecas */
#Include 'Protheus.ch'

/*/{Protheus.doc} M461COR
Ponto de Entrada para alterar a cor de status no browse da Nota Fiscal de Saída (Documento de Saída)
@author Caio César Henrique
@since 30/05/2019
@version 1.0
@type function
@example U_M461COR()
@obs Caso altere a cor, usar este P.E juntamente com o M461LEG para atualização da Legenda do Browse
/*/

User Function M461COR()

    /* Variáveis Locais */
    Local aArea  := GetArea()
    Local nFind  := 0

    /* Conteúdo do PARAMIXB
        - Tipo: Array
        - Posições: 2
        - aArray[x][1] - Condição para a cor do status
        - aArray[x][2] - Cor selecionada (via Resource)
    */
    Local aCores := PARAMIXB

    /* Busco a cor de status Azul */
    nFind := aScan( aCores, {|x| Alltrim(x[2]) == "BR_AZUL" } )

    /* Se encontrada, altero para Amarelo */
    If nFind > 0
       aCores[nFind][2] := "BR_AMARELO"
    EndIf

    /* Restaura área de trabalho */
    RestArea(aArea)

/* Retorno novo conjunto para o padrão */
Return ( aCores )
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Caio Henrique;

## Referências

- TDN

## Resumo

Altera as cores de status dos Pedidos no Browse de Preparação do Documento de Saída (MATA461)
