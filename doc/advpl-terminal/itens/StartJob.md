---
title: "StartJob"
function_name: "StartJob"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/startjob/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:17"
---

# StartJob

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/startjob/

## Exemplo da Rotina

```advpl
StartJob(cFuncao, cAmbiente, lIraAguardar)
```

## Exemplo 1- Exemplificação de chamada de jobs com threads simultâneas

```advpl
#Include 'Protheus.ch'

/*/{Protheus.doc} zCCHStart
Executa JOBs simultâneos no mesmo processo
@author Caio César Henrique
@since 03/12/2019
@version 1.0
@type function
@example U_zCCHStart()
/*/

User Function zCCHStart()

    /* Declaração de Variáveis */
    Local nThreads := 5
    Local nCount   := 0

    /* Abro minha empresa TESTE */
    RpcSetEnv("99","01")

    /* Looping de acordo com a quantidade de Threads desejadas */
    For nCount := 1 To nThreads

        /* Chama a função zCCHTXT cinco vezes no Looping, passando como parâmetro
           o número da Thread */
        StartJob("U_zTXT",GetEnvServer(),.F.,cValToChar(nCount))

    Next

    /* Encerro minha empresa TESTE */
    RpcClearEnv()

Return ( Nil )

/*/{Protheus.doc} zCCHStart
Executa JOBs simultâneos no mesmo processo
@author Caio César Henrique
@since 03/12/2019
@version 1.0
@type function
@example U_zCCHStart()
/*/

User Function zTXT(nThread)

    /* Declaração de Variáveis */
    Local nCurrent := Val(nThread)
    Local nHandle  := 0

    ConOut("Processo Iniciado - Thread: "+AllTrim(cValToChar(nCurrent)))

    /* Defino cada processo para cada thread */
    Do Case
        Case nCurrent = 1

            /* Cria arquivo teste */
            nHandle := FCreate("\Thread_"+cValToChar(nCurrent)+".txt")
            If nHandle = -1
                ConOut("Erro ao criar arquivo - FError " + Str(FError()))
            Else
                /* Alimento arquivo com 100 linhas básicas */
                For nCount := 1 To 100
                    FWrite(nHandle, "Registro: "+AllTrim(cValToChar(nCount)) + CRLF)
                Next

                /* Fecho arquivo */
                FClose(nHandle)
            EndIf

        Case nCurrent = 2

            /* Cria arquivo teste */
            nHandle := FCreate("\Thread_"+cValToChar(nCurrent)+".txt")
            If nHandle = -1
                ConOut("Erro ao criar arquivo - FError " + Str(FError()))
            Else
                /* Alimento arquivo com 100 linhas básicas */
                For nCount := 1 To 100
                    FWrite(nHandle, "Registro: "+AllTrim(cValToChar(nCount)) + CRLF)
                Next

                /* Fecho arquivo */
                FClose(nHandle)
            EndIf

        Case nCurrent = 3

            /* Cria arquivo teste */
            nHandle := FCreate("\Thread_"+cValToChar(nCurrent)+".txt")
            If nHandle = -1
                ConOut("Erro ao criar arquivo - FError " + Str(FError()))
            Else
                /* Alimento arquivo com 100 linhas básicas */
                For nCount := 1 To 100
                    FWrite(nHandle, "Registro: "+AllTrim(cValToChar(nCount)) + CRLF)
                Next

                /* Fecho arquivo */
                FClose(nHandle)
            EndIf

        Case nCurrent = 4

            /* Cria arquivo teste */
            nHandle := FCreate("\Thread_"+cValToChar(nCurrent)+".txt")
            If nHandle = -1
                ConOut("Erro ao criar arquivo - FError " + Str(FError()))
            Else
                /* Alimento arquivo com 100 linhas básicas */
                For nCount := 1 To 100
                    FWrite(nHandle, "Registro: "+AllTrim(cValToChar(nCount)) + CRLF)
                Next

                /* Fecho arquivo */
                FClose(nHandle)
            EndIf

        Case nCurrent = 5

            /* Cria arquivo teste */
            nHandle := FCreate("\Thread_"+cValToChar(nCurrent)+".txt")
            If nHandle = -1
                ConOut("Erro ao criar arquivo - FError " + Str(FError()))
            Else
                /* Alimento arquivo com 100 linhas básicas */
                For nCount := 1 To 100
                    FWrite(nHandle, "Registro: "+AllTrim(cValToChar(nCount)) + CRLF)
                Next

                /* Fecho arquivo */
                FClose(nHandle)
            EndIf
    EndCase

/* Encerro o processo */
ConOut("Processo Encerrado - Thread: "+AllTrim(cValToChar(nCurrent)))

Return ( Nil )
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Caio Henrique;

## Referências

- TDN

## Resumo

Executa a chamada de um processo
