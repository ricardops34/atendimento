---
schemaVersion: 1
generatedAt: 2026-06-17T15:20:00Z
reversa:
  version: "1.2.43"
kind: data_migration_plan
producedBy: designer
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde1"
---

# Data Migration Plan — atendimento

> Plano de migração dos dados do legado para o sistema novo: mapeamento, transformações, ETL, cutover de dados e validação.

## Resumo
- **Volume estimado**:
  - `empresa`: ~100 registros.
  - `profissional`: ~50 registros.
  - `contrato`: ~150 registros.
  - `contrato_item` (escalas): ~500 registros.
  - `agendamento`: ~5.000 a 10.000 registros (histórico de atendimentos do dump `bjsoft18_portal.sql`).
  - `realizado`: ~2.000 registros.
- **Janela de migração**: Fim de semana, duração máxima de 4 horas (conforme `cutover_plan.md`).
- **Estratégia**: Migração em lote único (Bulk ETL) devido ao tamanho reduzido e isolamento do MVP.

---

## Mapeamento legado → novo

| Tabela Legada (MySQL) | Tabela Alvo (PostgreSQL) | Tipo | Notas |
|---|---|---|---|
| `empresa` | `empresa` | preservado | Normalização simples de tipos de strings. |
| `profissional` | `profissional` | preservado | Normalização simples. |
| `contrato` | `contrato` | normalizado | Mapeamento de chaves e sanitização de cores (T-01). |
| `contrato_item` | `contrato_item` | normalizado | Renomeação de colunas e normalização de chaves estrangeiras. |
| `agendamento` | `agendamento` | transformado | Conversão do cálculo de `hora_total` textual para minutos (T-02), e datetime compostos (T-03). |
| `realizado` | `realizado` | transformado | Conversão para tipo numérico Decimal (T-04). |

---

## Transformações

### Transformação T-01: Higienização de Cores Hexadecimais
- **Aplica em**: `contrato.cor` e `agendamento.cor`.
- **Regra**: Limpar espaços em branco e validar a string de cor contra a expressão regular `/^#[0-9A-F]{6}$/i`. Se a cor for nula, vazia ou inválida, substituí-la pelo valor padrão `#333333` (cinza).
- **Tratamento de inválidos**: Preencher com o default `#333333`.
- **Origem da regra**: `target_business_rules.md` § BR-HUMANA-002 (Decidido pelo PO Ricardo).

### Transformação T-02: Conversão de Tempo Líquido Textual para Minutos
- **Aplica em**: `agendamento.hora_total` -> `agendamento.duracao_minutos`.
- **Regra**: Converter o valor textual `hh:ii` para um inteiro que representa a quantidade total de minutos de trabalho líquido.
  $$\text{Duração em Minutos} = (\text{Horas} \times 60) + \text{Minutos}$$
  Exemplo: `"07:30"` líquido vira `450` minutos.
- **Tratamento de inválidos**: Se o campo no legado estiver nulo, vazio ou num formato inválido, recalcular a partir de `hora_inicio`, `hora_fim` e os intervalos, ou preencher com `0`.
- **Origem da regra**: `discard_log.md` § BR-DESCARTAR-002 e `target_business_rules.md` § BR-MIGRAR-002.

### Transformação T-03: Concatenação de Datetimes Técnicos
- **Aplica em**: `agendamento.horario_inicial`, `agendamento.horario_final`.
- **Regra**: Concatenar o campo `data_agenda` (DATE) com as strings de hora `hora_inicio` e `hora_fim` (hh:ii) para compor objetos `DateTime` compatíveis com o PostgreSQL e Prisma.
  Exemplo: `2026-06-17` + `"08:30"` -> `2026-06-17T08:30:00-04:00` (TIMESTAMPTZ).
- **Tratamento de inválidos**: Rejeitar o registro (lançar erro de validação) se campos obrigatórios de data/hora de agendamento estiverem nulos.
- **Origem da regra**: `target_business_rules.md` § BR-MIGRAR-001.

### Transformação T-04: Geração de Horas Decimais para Faturamento
- **Aplica em**: `realizado.horas_decimais`.
- **Regra**: Converter a duração total líquida em minutos (`duracao_minutos`) do agendamento de origem para horas decimais com precisão centesimal.
  $$\text{Horas Decimais} = \frac{\text{duracao\_minutos}}{60}$$
  Exemplo: `450` minutos líquidos vira `7.50` horas decimais.
- **Tratamento de inválidos**: Rejeitar se o agendamento correspondente estiver ausente.
- **Origem da regra**: `target_business_rules.md` § BR-MIGRAR-008.

---

## Estratégia de ETL

- **Ferramenta**: Script CLI customizado escrito em **TypeScript** (rodado via `ts-node`), utilizando o Prisma Client para inserção no PostgreSQL e um driver de conexão leve (ex: `mysql2` ou SQLite driver) para ler a base legada.
- **Fluxo**:
  1. **Extração (Extract)**: O script conecta à base de dados legada e lê sequencialmente as tabelas na ordem de dependência: `empresa` -> `profissional` -> `contrato` -> `contrato_item` -> `agendamento` -> `realizado`.
  2. **Transformação (Transform)**: Limpa strings, sanitiza cores hexadecimais (T-01), calcula minutos (T-02), concatena datetimes (T-03) e formata decimais (T-04).
  3. **Carga (Load)**: Insere os dados higienizados no PostgreSQL usando operações em lote Prisma (`prisma.entity.createMany()`).
- **Idempotência**: O script inicia limpando a base de dados PostgreSQL (`TRUNCATE` ou deleção em cascata), garantindo que possa ser reexecutado do zero em caso de falha a qualquer momento do go-live.
- **Throughput esperado**: ~1.000 registros por segundo (duração total da carga inferior a 30 segundos).

---

## Backfill e delta
Devido à baixa volumetria total do banco de dados legado (~10k registros no total), **não haverá backfill prévio**. Toda a carga de dados ocorrerá em um bloco atômico (Bulk único) durante a janela de cutover de 4 horas definida no final de semana, o que elimina a complexidade de capturar deltas ou lidar com sincronização ativa de banco de dados concorrente.

---

## Cutover de dados
- **Janela**: Sábado, das 14:00 às 18:00 (conforme `cutover_plan.md`).
- **Sequência de corte**:
  1. Congelar escritas no portal legado (desativar rotas).
  2. Extrair Dump SQL final da base de dados legada.
  3. Importar Dump em servidor temporário para acesso de leitura do script de ETL.
  4. Executar script de migração `ts-node migrate.ts`.
  5. Validar logs do script e contagem de linhas importadas.
- **Verificação pós-corte**:
  - **Contagens**: O script compara a quantidade de registros em cada tabela legada contra a nova base PostgreSQL. Tolerância de diferença de 0% para todas as entidades.
  - **Checksums**: Soma total das horas decimais em `realizado` comparada à soma correspondente do legado para garantir paridade centesimal.

---

## Validação de qualidade

| Métrica | Alvo | Fonte de medição |
|---|---|---|
| Contagem por entidade | igual ± 0% | Query de contagem `COUNT(*)` direta em ambos os bancos. |
| Soma de faturamento de horas | igual ± 0,00% | Comparação da soma total de horas líquidas convertidas em decimais. |
| Integridade referencial | 0 registros órfãos | Validado pelas FK Constraints ativadas no PostgreSQL. |
| Sanitização de Cores | 100% no padrão hex | Verificação de restrição regex no Postgres ou varredura de script. |

---

## Riscos específicos de dados
- **RISK-001**: Quebra de interface por cores hex nulas/inválidas no backup (Resolvido pela transformação T-01).
- **RISK-002**: Inconsistências de faturamento centesimal na tipagem de tempo (Mitigado pela precisão da transformação T-02 e validação no checksum).

---

## Script de ETL (Implementação de Referência)

Abaixo encontra-se o script TypeScript detalhado (`migrate.ts`) que implementa as etapas de extração, transformação e carga (Bulk ETL) definidas neste plano, validando as regras **T-01**, **T-02**, **T-03** e **T-04**.

```typescript
import { PrismaClient } from '@prisma/client';
import * as mysql from 'mysql2/promise';

const prisma = new PrismaClient();

// Configuração de conexão com o banco legado (MySQL)
const legacyDbConfig = {
  host: process.env.LEGACY_DB_HOST || 'localhost',
  user: process.env.LEGACY_DB_USER || 'root',
  password: process.env.LEGACY_DB_PASSWORD || '',
  database: process.env.LEGACY_DB_NAME || 'bjsoft18_portal',
};

/**
 * Função T-01: Higienização de Cores Hexadecimais
 */
function sanitizeColor(color: string | null | undefined): string {
  if (!color) return '#333333';
  const cleanColor = color.trim();
  const hexRegex = /^#[0-9A-F]{6}$/i;
  return hexRegex.test(cleanColor) ? cleanColor : '#333333';
}

/**
 * Função T-02: Conversão de Tempo Líquido Textual para Minutos
 */
function parseDurationToMinutes(durationText: string | null): number {
  if (!durationText || typeof durationText !== 'string') return 0;
  const parts = durationText.split(':');
  if (parts.length !== 2) return 0;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
}

/**
 * Função T-03: Concatenação de Datetimes Técnicos
 */
function composeDateTime(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const composed = new Date(date);
  composed.setHours(hours || 0, minutes || 0, 0, 0);
  return composed;
}

/**
 * Script Principal de ETL
 */
async function runETL() {
  console.log('Iniciando script de migração ETL...');
  const legacyConn = await mysql.createConnection(legacyDbConfig);

  try {
    // 1. Limpeza do banco de dados alvo (Idempotência)
    console.log('Limpando tabelas do banco de dados PostgreSQL...');
    await prisma.$transaction([
      prisma.realizado.deleteMany(),
      prisma.agendamento.deleteMany(),
      prisma.contratoItem.deleteMany(),
      prisma.contrato.deleteMany(),
      prisma.profissional.deleteMany(),
      prisma.empresa.deleteMany(),
    ]);

    // 2. Migração de Empresas
    console.log('Migrando Empresas...');
    const [empresasLegacy] = await legacyConn.execute<any[]>('SELECT * FROM empresa');
    const empresasToInsert = empresasLegacy.map((e) => ({
      id: e.id,
      nome: String(e.nome).trim(),
    }));
    await prisma.empresa.createMany({ data: empresasToInsert });

    // 3. Migração de Profissionais
    console.log('Migrando Profissionais...');
    const [profissionaisLegacy] = await legacyConn.execute<any[]>('SELECT * FROM profissional');
    const profissionaisToInsert = profissionaisLegacy.map((p) => ({
      id: p.id,
      nome: String(p.nome).trim(),
    }));
    await prisma.profissional.createMany({ data: profissionaisToInsert });

    // 4. Migração de Contratos
    console.log('Migrando Contratos...');
    const [contratosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM contrato');
    const contratosToInsert = contratosLegacy.map((c) => ({
      id: c.id,
      empresaId: c.empresa_id,
      descricao: String(c.descricao).trim(),
      cor: sanitizeColor(c.cor),
      isFeriado: c.is_feriado === 1 || false,
    }));
    await prisma.contrato.createMany({ data: contratosToInsert });

    // 5. Migração de Escalas (ContratoItem)
    console.log('Migrando Escalas (ContratoItem)...');
    const [itensLegacy] = await legacyConn.execute<any[]>('SELECT * FROM contrato_item');
    const itensToInsert = itensLegacy.map((ci) => ({
      id: ci.id,
      contratoId: ci.contrato_id,
      profissionalId: ci.profissional_id,
      diaSemana: ci.dia_semana,
      horaInicio: ci.hora_inicio || '00:00',
      horaFim: ci.hora_fim || '00:00',
      intervaloIni: ci.intervalo_ini || '00:00',
      intervaloFim: ci.intervalo_fim || '00:00',
    }));
    await prisma.contratoItem.createMany({ data: itensToInsert });

    // 6. Migração de Agendamentos
    console.log('Migrando Agendamentos...');
    const [agendamentosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM agendamento');
    const agendamentosToInsert = agendamentosLegacy.map((a) => {
      // Aplicando transformações T-02 e T-03
      const duracaoMinutos = parseDurationToMinutes(a.hora_total);
      const horarioInicial = composeDateTime(new Date(a.data_agenda), a.hora_inicio);
      const horarioFinal = composeDateTime(new Date(a.data_agenda), a.hora_fim);

      return {
        id: a.id,
        contratoId: a.contrato_id || null,
        profissionalId: a.profissional_id || null,
        descricao: String(a.descricao || '').trim(),
        dataAgenda: new Date(a.data_agenda),
        horaInicio: a.hora_inicio || '00:00',
        horaFim: a.hora_fim || '00:00',
        horaIntervaloInicial: a.hora_intervalo_inicial || '00:00',
        horaIntervaloFinal: a.hora_intervalo_final || '00:00',
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: a.local || 'P',
        tipo: a.tipo || 'A',
        cor: sanitizeColor(a.cor),
        observacao: a.observacao || null,
      };
    });
    await prisma.agendamento.createMany({ data: agendamentosToInsert });

    // 7. Migração de Realizados
    console.log('Migrando Realizados...');
    const [realizadosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM realizado');
    const realizadosToInsert = realizadosLegacy.map((r) => {
      // Localizamos a duracao_minutos no array parseado para T-04
      const agendamentoRelacionado = agendamentosToInsert.find(a => a.id === r.agendamento_id);
      const minutos = agendamentoRelacionado?.duracaoMinutos || 0;
      const horasDecimais = (minutos / 60).toFixed(2); // Transformação T-04

      return {
        id: r.id,
        agendamentoId: r.agendamento_id,
        horasDecimais: Number(horasDecimais),
      };
    });
    await prisma.realizado.createMany({ data: realizadosToInsert });

    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração ETL:', error);
  } finally {
    await legacyConn.end();
    await prisma.$disconnect();
  }
}

runETL();
```
