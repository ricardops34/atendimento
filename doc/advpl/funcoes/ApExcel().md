---
title: "ApExcel()"
function_name: "ApExcel"
doc_type: "function"
status: "published"
page_id: 269441698
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=269441698"
tdn_last_modified: "08 dez, 2016"
exported_at: "2026-06-03 09:58:59"
has_parameters: false
has_example: true
section_keys: [exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# ApExcel()

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=269441698

## Exemplo

```text
informando =SIGA(“MesExtenso”;2)
Desta forma, será retornado o mês “Fevereiro”.
Observe que o nome da função Protheus é informado entre aspas. (“  ”).
A função SIGA() é útil quando se deseja informar funções novas do Protheus, que ainda não foram implementadas na Planilha Microsoft Excel®:
Opção 4
A quarta forma, também é iniciar a informação com a função SIGA( ), porém as funções Protheus, juntamente com seus parâmetros devem ser digitados entre aspas, obedecendo à sintaxe padrão que utiliza os sinais de parênteses:

=SIGA(“MesExtenso(2)”)

Restrições sobre o Uso de Funções
Pode-se utilizar Execblock/User Function nas células do Microsoft Excel®com algumas restrições:
Não devem ser utilizadas entradas de dados ou qualquer outro tipo de “Tela”.
O Execblock/User Function deve obrigatoriamente retornar um valor.
O Execblock/User Function deve ser pequeno para evitar a perda da conexão do Protheus com o Microsoft Excel®.
O Microsoft Excel® utiliza um padrão de data diferente do Protheus, por esse motivo qualquer função de planilha do Protheus utilizada a partir do menu “Inserir Fórmula” do Microsoft Excel® ou da sintaxe =Siga(“nomefunção”;Par01;Par02) que utilize data como parâmetro ou retorne uma data, deve obedecer as regras abaixo:
Formatar a célula como data, para as funções que retornem data.
Utilizar como parâmetro das funções do Protheus uma referência de célula cujo conteúdo seja uma data, ou digitar a data no formato do Microsoft Excel® “00:00 10/05/98”.
Toda função do Protheus utilizada a partir do menu “Inserir Fórmula” do Microsoft Excel®ou da sintaxe “=Siga(“nomefunção”; Par01;Par02)” que utiliza valor lógico (.T./.F.) como parâmetro, deve obedecer o padrão do Microsoft Excel® (atenção! com o idioma do Microsoft Excel®):
.T. - VERDADEIRO/TRUE
.F. - FALSO/FALSE
```
