---
title: "ExecAuto MATA300"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-mata300/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:36"
---

# ExecAuto MATA300

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-mata300/

## Exemplo da Rotina

```advpl
Mata300()
```

## Exemplo 1- Chamando a rotina de forma automática

```advpl
//Identifica que será executado via JOB
lJob := .T.

//Atualiza as perguntas (baixar fonte em https://terminaldeinformacao.com/2017/02/28/funcao-altera-conteudo-de-perguntas-mv_par-em-advpl/ )
cPerg := "MTA300"
u_zAtuPerg(cPerg, "MV_PAR01", "01")     //Armazém De
u_zAtuPerg(cPerg, "MV_PAR02", "01")     //Armazém Até
u_zAtuPerg(cPerg, "MV_PAR03", "000001") //Produto De
u_zAtuPerg(cPerg, "MV_PAR04", "000099") //Produto Até
Pergunte(cPerg, .F.)

//Executa a operação automática
lMsErroAuto := .F.
MSExecAuto({|x| MATA300(x)}, lJob)

//Se houve erro, salva um arquivo dentro da protheus data
If lMsErroAuto
	cDiretorio := "\x_erros\"
	cArquivo   := "log_mata300_" + dToS(Date()) + "_" + StrTran(Time(), ':', '-')

	MostraErro(cDiretorio, cArquivo)
EndIf
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Rotina Automática do Saldo Atual (MATA300)
