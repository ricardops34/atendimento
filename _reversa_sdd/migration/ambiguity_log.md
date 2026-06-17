---
schemaVersion: 1
generatedAt: 2026-06-17T15:15:00Z
reversa:
  version: "1.2.43"
kind: ambiguity_log
producedBy: curator
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde3"
---

# Ambiguity Log — atendimento

> Registro de ambiguidades, lacunas e itens pendentes de decisão identificados no pipeline de migração do Reversa.
> Esses pontos devem ser validados pelo Product Owner (Ricardo) antes de prosseguir com a implementação.

| ID | Regra Associada | Origem | Tipo | Descrição Curta | Recomendação do Curator | Status | Escolha PO / Data |
|---|---|---|---|---|---|---|---|
| AL-001 | BR-HUMANA-001 | `_reversa_sdd/agendamentos/design.md` § pág 108 | 🔴 GAP | Falta de validação de choque de horários de profissionais no mesmo período. | **Opção 3 (Aviso)**: Permitir salvar o agendamento conflitante, mas emitir aviso (soft warning) na UI/API para alertar o usuário. | **RESOLVIDA** | Opção 1 (Manter comportamento do legado / Ricardo / 2026-06-17) |
| AL-002 | BR-HUMANA-002 | `_reversa_sdd/migration/migration_brief.md` § pág 29 | 🔴 GAP | Registros históricos com cores hexadecimais nulas ou inválidas no backup SQL. | **Opção 2**: Corrigir e sanitizar no banco na fase de migração (`TM-01`) aplicando a cor padrão `#333333` diretamente. | **RESOLVIDA** | Opção 1 (Sanitizar no ETL para #333333 / Ricardo / 2026-06-17) |
| AL-003 | BR-HUMANA-003 | `_reversa_sdd/state-machines.md` § pág 40 | ⚠️ AMBÍGUA | IDs e cores de contratos de feriado configurados de forma estática (hardcoded) no legado. | **Opção 2**: Criar uma propriedade/flag no banco de dados ou expor variável de ambiente para configurar dinamicamente qual contrato representa os feriados. | **RESOLVIDA** | Opção 1 (Configurar dinamicamente / Ricardo / 2026-06-17) |

---

## Próximos Passos
1. Apresentar os itens acima para a aprovação/decisão do Product Owner (Ricardo).
2. Assim que resolvidos, atualizar este log marcando o status como `RESOLVIDA`, registrando a opção escolhida, o decisor e a data.
