---
title: "Copy File … To …"
function_name: "Copy"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/copy-file-to/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:12:51"
---

# Copy File … To …

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/copy-file-to/

## Exemplo da Rotina

```advpl
Copy File &("Nome do Arquivo") To &("Porta")
```

## Exemplo 1- Imprimindo uma etiqueta na porta LPT1

```advpl
//Definindo nome do arquivo e porta
cNomeArq := "C:\Spool\etiqueta.txt"
cPorta   := "LPT1"

//Definições da etiqueta
cLin := "CT~~CD,~CC^~CT~"
cLin += "^XA"
cLin += "^PW799"
cLin += "^MD20"
cLin += "^FT759,585^A0B,20,19^FH\^FD" + cLinha7 + "^FS"
//... mais comandos
cLin += "^PQ"+cQtImp+",0,"+cQtImp+",Y^XZ"+cEOL

//Gravando conteúdo no arquivo
MemoWrite(cNomeArq, cLin)

//Mandando para a impressora... caso queira simular use:
//net use PORTA \\DOMINIO\ALIAS_IMPRESSORA
//Ex.: net use LPT1 \\192.168.x.y\Zebra-Protheus
Copy File &(cNomeArq) To &(cPorta)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Copia um arquivo para uma porta serial
