# Referencias ADVPL e TLPP

## Objetivo
Guia global de referencia para desenvolvimento Protheus em ADVPL/TLPP, sem vinculacao a modulo especifico.

## Fontes oficiais (prioridade)
1. TDN TOTVS (documentacao oficial de linguagem e framework)
2. TDN Framework (FWRest, FWFileWriter, MVC, DBAccess)
3. Codigo legado validado no proprio repositorio (padroes internos)

## Tipos comuns (ValType)
- `C`: caractere
- `N`: numerico
- `D`: data
- `L`: logico
- `A`: array
- `B`: bloco
- `U`: nulo/indefinido
- `J`: JSON (runtime atual)
- `O`: objeto classico

Regra pratica para JSON:
- Priorizar `ValType(x) == "J"`
- Usar `ValType(x) $ "OJ"` quando precisar compatibilidade com ambientes legados.

## Padroes de funcao
- `User Function`: ponto de entrada publico
- `Static Function`: uso interno do arquivo
- Nomeacao clara e consistente com padrao do time

## Banco e transacao (boas praticas)
- Preservar contexto com `GetArea()/RestArea()` ou `FWGetArea()/FWRestArea()`
- Em alteracao de registros:
  - `RecLock()`
  - atualizar campos
  - `MsUnlock()`
- Em exclusao/logica critica: revisar transacao (`Begin Transaction`/`End Transaction`) conforme regra funcional

## HTTP/API (Framework)
- Usar `FWRest()` para chamadas HTTP
- Registrar sempre:
  - HTTP code
  - erro tecnico
  - payload de retorno (quando permitido)
- Em autenticacao:
  - validar token/chave
  - tratar retorno sem `code` quando houver token valido

## Arquivos e log
- Preferir `FWFileWriter` para escrita de arquivo
- Nao gravar token sensivel em log de producao
- Padronizar nome de arquivo sem dado pessoal sensivel

## Checklist rapido de revisao
1. Tipos `ValType` validados nos pontos de entrada
2. `If/EndIf` e `While/End` balanceados
3. `RecLock/MsUnlock` pareados
4. Tratamento de erro com mensagem util ao usuario
5. Log tecnico suficiente para diagnostico
6. Sem credenciais fixas em producao

## Observacoes
- Este documento e geral e deve ser reutilizado por qualquer modulo Protheus.
- Quando houver divergencia, prevalece documentacao oficial do TDN.
