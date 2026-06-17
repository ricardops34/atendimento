---
title: "IMPORTANTE!"
function_name: "IMPORTANTE"
doc_type: "article"
status: "published"
page_id: 454831708
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=454831708"
tdn_last_modified: "11 nov, 2024"
exported_at: "2026-06-03 09:58:54"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "article"
---

# IMPORTANTE!

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=454831708

## ConteÃºdo

Tempo aproximado para leitura: 04 min
DADOS GERAIS
A função MenuDef é uma função estática normalmente criada em todas as rotinas de menu, retornando assim as opções da rotina.
A leitura do MenuDef ocorre em diversas ocasiões:
Privilégios
Papel de trabalho
Menu Funcional
Relatório
Pesquisa

Dada a importância de sua estrutura, antes de definir o conteúdo de retorno das funções MenuDef, precisamos entender que esta função não pode retornar conteúdos diferentes dependendo da origem da chamada ou até mesmo por critérios específicos de um determinado usuário ou módulo. Sendo assim, essa função deve atender a certos requisitos:
Condicionais: Não se deve utilizar condicionais para definição da estrutura de array. Ex.: IF, Case, PE etc. Estas condições podem retornar conteúdos distintos, o que influência na definição do cadastrado de privilégio e permissões de acesso;
Interface: Não deve-se criar interface. Esta função pode ser chamada em situações onde não existe suporte a janelas de diálogo, ou até mesmo que prejudiquem, novamente, na definição do cadastro de privilégios e permissões de acesso;
Dicionário: Não deve-se efetuar a leitura de dicionários. Quando trata-se de SIGAMDI, o ambiente é inicializado com o mínimo de tabelas abertas, pois cada aba será uma nova thread, portanto ao tentar acessar algum dicionário, é possível que o mesmo não esteja apto para utilização, gerando exceções diversas;
Escopo: Não deve-se fazer uso de variáveis privadas ou públicas da rotina ou módulo, essa situação pode gerar exceções diversas durante a geração e leitura de relatórios, privilégios, papéis de trabalho etc;

IMPORTANTE!
Exemplos de funções que ocasionam problemas na leitura do MenuDef: Pergunte, GetMV, dbSelectArea, Pontos de Entrada

FAQ
Preciso que a mesma rotina possua opções diferentes:
O MVC do Protheus permite reaproveitar um Modelo em outra View, com isso é possível utilizar de um modelo já previamente criado, adicionar comportamentos e opções de menu, criando assim uma nova rotina que possui opções e/ou comportamento distintos.
