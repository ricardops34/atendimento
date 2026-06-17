# Impacto no Legado — Feature `001-scaffold-repositorio`

> Identificador: `001-scaffold-repositorio`  
> Data: `2026-06-17`  

## 📂 Arquivos Afetados e Mapeamento

Nenhum arquivo do sistema legado em PHP (`antigo/`) foi criado, modificado ou removido nesta rodada de desenvolvimento. Toda a infraestrutura do novo ecossistema foi criada em diretórios novos e isolados.

| Arquivo afetado | Componente moderno | Tipo de impacto | Severidade | Justificativa |
| :--- | :--- | :--- | :--- | :--- |
| `backend/` | API NestJS | `componente-novo` | LOW | Inicialização do scaffold do servidor backend da API. |
| `frontend/` | SPA Angular PO-UI | `componente-novo` | LOW | Inicialização do scaffold do portal de usuário web frontend. |
| `backend/prisma/` | Banco de Dados (Prisma) | `componente-novo` | LOW | Criação e configuração básica do ORM Prisma para conexões futuras. |

## 🔄 Diff Conceitual por Componente

*   **API NestJS (`backend/`)**: Nova camada de serviços e controladores que no futuro substituirá a lógica acoplada do Adianti Framework PHP.
*   **SPA Angular (`frontend/`)**: Novo portal SPA baseado em componentes PO-UI modernos em substituição aos templates renderizados do Adianti.
*   **Prisma ORM (`backend/prisma/`)**: Configurado com datasource PostgreSQL para substituir o modelo de dados padrão Active Record e conexões diretas MySQL do legado.

## 🟢 Preservadas

Como esta é uma tarefa de scaffolding puro de infraestrutura, todas as regras de negócio core mapeadas do legado continuam intactas e serão implementadas em etapas futuras:

*   **RN01 — Geração de Agendamentos em Lote (Escala Contratual)**: Intacta. Será implementada no NestJS em rotinas futuras.
*   **RN02 — Fechamento/Faturamento de Atendimentos em Lote (Realizados)**: Intacta. Será implementada em módulo posterior.
*   **RN03 — Cálculo de Horas Líquidas**: Intacta. A lógica de desconto de almoço/descanso será espelhada no TypeScript da API.
*   **RN04 — Imutabilidade de Atendimentos Concluídos**: Intacta. Validação de transição de status será feita nos guards/controllers da API.
*   **RN05 — Re-Preenchimento Assíncrono do Agendamento (Herança de Contrato)**: Intacta. Lógica reativa de UI será tratada nos formulários PO-UI.

## 🟡 Modificadas

*   Nenhuma regra foi modificada ou removida nesta rodada de desenvolvimento.
