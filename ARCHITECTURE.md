# 🏛️ Arquitetura do Sistema SaaS Enterprise - BJSoft

Este documento detalha o funcionamento técnico da plataforma.

---

## 🎨 Dinamismo de Interface e Campos (Metadata-Driven)

### 1. Telas Dinâmicas (Dynamic Pages)
- **Motor**: Baseado nos templates `PoPageDynamicTable` e `PoPageDynamicEdit`.
- **Funcionamento**: A interface não é "fixa". Ela consome o endpoint `/metadata/:entity`, que retorna quais campos devem ser exibidos, suas validações, ordens e tipos. Isso permite mudar a interface de um cliente sem mexer no código Angular.

### 2. Campos Personalizados (Custom Fields)
- **Persistência**: Armazenados como JSONB no PostgreSQL na tabela `EntityMetadata`.
- **Flexibilidade**: Permite que o suporte adicione novos campos (ex: "CPF do Sócio" em Tenants) apenas atualizando o metadado, sem precisar de novas migrações de banco de dados.

---

## ⚙️ Extensibilidade de Negócio (Plugin System)

### 1. Pontos de Interação (Hook Points)
O código core do sistema possui "âncoras" onde rotinas customizadas podem ser injetadas:
- `before_save`: Validações ou cálculos antes de persistir no banco.
- `after_save`: Ações pós-processamento (ex: enviar um Zap, integrar com ERP externo).
- `custom_calc`: Substituição de lógicas de cálculo padrão por regras específicas do cliente.

### 2. Rotinas Versionadas por Cliente
- Cada tenant tem sua própria pasta em `custom_routines/[tenantId]`.
- O suporte pode subir a `v1.js`, `v2.js`, etc., e escolher qual está ativa no banco de dados.

---

## 📊 Relatórios Dinâmicos (BI)
- **jsreport Engine**: Renderização via Docker de templates HTML/Handlebars para PDF/Excel.
- **Data Injection**: A API injeta os dados do tenant em tempo real nos templates, garantindo que o relatório seja sempre atualizado e filtrado.

---

## 🤖 IA-Ready & Integração
- **Semantic IDs**: IDs únicos em todos os elementos para navegação de agentes.
- **AI Context API**: Fornece o mapeamento completo do sistema para assistentes virtuais.
- **Swagger/OpenAPI**: Porta de entrada para integrações externas e Function Calling.

---

*(Demais seções de Multi-tenancy e Segurança mantidas)*
