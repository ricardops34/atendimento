---
title: "FWFileReader"
function_name: "FWFileReader"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "arquivos"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwfilereader/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:13"
---

# FWFileReader

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwfilereader/

## Exemplo da Rotina

```advpl
FWFileReader():New("Caminho do Arquivo")
```

## Exemplo 1- Fazendo a leitura de um Arquivo (linha a linha)

```advpl
//Definindo o arquivo a ser lido
oFile := FWFileReader():New("C:\TOTVS\Arquivo.txt")

//Se o arquivo pode ser aberto
If (oFile:Open())

	//Se não for fim do arquivo
	If ! (oFile:EoF())
		//Enquanto houver linhas a serem lidas
		While (oFile:HasLine())

			//Buscando o texto da linha atual
			cLinAtu := oFile:GetLine()

			//Mostrando a linha no console.log
			ConOut("Linha: " + cLinAtu)
		EndDo
	EndIf

	//Fecha o arquivo e finaliza o processamento
	oFile:Close()
EndIf
```

## Exemplo 2- Fazendo a leitura de um Arquivo (todo o conteúdo)

```advpl
//Definindo o arquivo a ser lido
oFile := FWFileReader():New("C:\TOTVS\Arquivo.txt")

//Se o arquivo pode ser aberto
If (oFile:Open())

	//Se não for fim do arquivo
	If ! (oFile:EoF())
		cConteudo  := oFile:FullRead()

		Alert(cConteudo)
	EndIf

	//Fecha o arquivo e finaliza o processamento
	oFile:Close()
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Classe que efetua a leitura de um arquivo texto
