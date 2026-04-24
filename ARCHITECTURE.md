# 🏛️ Arquitetura do Sistema SaaS Enterprise

Este documento é a referência técnica para todos os recursos implementados no sistema.

---

## 🎨 Padrões de Interface (UI/UX) - AI-Ready
- **IDs Únicos**: Formato `saas-[modulo]-[elemento]-[acao]` para automação por IA.
- **Service-API**: Uso de metadados dinâmicos para auto-descoberta de estruturas de dados.
- **Ambiente Dinâmico**: Detecção automática entre Localhost e Produção (bjsoft.com.br).

---

## 🏗️ Estratégia de Multi-tenancy (Modelo Híbrido)
1. **Pool Compartilhado (Standard/Pro)**: Shared Database com isolamento lógico via `tenant_id`.
2. **Instância Dedicada (Enterprise)**: Database-per-tenant para conformidade e performance.
3. **Connection Router**: Roteamento inteligente de conexões baseado no plano do cliente.

---

## ⚙️ Componentes de Engenharia SaaS

### 🔌 Custom Routines & Plugins (Versionamento)
- **Extensibilidade**: Pontos de gancho (`hooks`) injetados no código padrão (ex: `before_product_save`).
- **Versionamento**: Cada cliente pode ter múltiplas versões de um script JS. O sistema permite ativar/desativar versões via banco de dados sem reiniciar o servidor.
- **Isolamento**: Códigos customizados são carregados apenas para o tenant específico.

### 💳 Billing & Adimplência
- **Interceptor de Cobrança**: Bloqueia automaticamente o acesso a módulos protegidos se o status do Tenant for `SUSPENDED`.
- **Status de Ciclo de Vida**: `ACTIVE`, `OVERDUE` (Aviso), `SUSPENDED` (Bloqueio).

### 📊 Relatórios e BI
- **jsreport Integration**: Motor de renderização profissional para PDF/Excel.
- **Custom Branding**: Cabeçalhos e logos de relatórios adaptados à marca do cliente.

### 🤖 IA Discovery & Metadata
- **AI Context API**: Endpoint `/metadata/ai-context` que fornece o "System Prompt" e capacidades do sistema para agentes inteligentes.

---

## 🛡️ Segurança e Integração
- **API Keys**: Suporte a tokens de integração externa para clientes.
- **Swagger/OpenAPI**: Documentação viva acessível em `/docs` para humanos e IAs.
- **Audit Logs**: Rastreabilidade total de operações críticas.
