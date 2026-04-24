# 🏗️ Skill SaaS Architecture | Multi-tenant Expert

[![Powered by Antigravity](https://img.shields.io/badge/Powered%20by-Antigravity-blueviolet?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)
[![Methodology: EVO-METHOD](https://img.shields.io/badge/Methodology-EVO--METHOD-orange?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)

Esta skill é um especialista em engenharia de software para sistemas **SaaS (Software as a Service)** de alta escala. Ela fornece inteligência profunda para arquiteturas **Multi-tenant**, garantindo isolamento, escalabilidade e performance.

---

## 💎 Ferramentas de Engenharia

| Ferramenta | Descrição |
| :--- | :--- |
| `analyze_isolation` | Analisa a estratégia de isolamento de dados (Schema vs Shared DB). |
| `validate_tenant_filter` | Verifica se o código de acesso ao banco aplica filtros de tenant corretamente. |
| `generate_multi_tenant_pattern` | Gera boilerplates de middleware e serviços multi-tenant. |
| `scaling_best_practices` | Recomenda estratégias de escalabilidade (Sharding, Replication). |

---

## 🧠 Metodologia EVO-METHOD

Seguindo o fluxo **EVO-METHOD**, esta skill atua no papel de **Cloud Architect**:
- **Tenant Context**: Garante que o contexto do usuário seja propagado com segurança por toda a stack.
- **Resource Management**: Ajuda a planejar limites de uso por cliente (Throttling e Quotas).

---

## 🚀 Instalação

### Configuração no Antigravity / Claude
```json
{
  "mcpServers": {
    "saas-architecture-skill": {
      "command": "node",
      "args": ["C:/Ricardo/opencode/sistema/skills/saas-architecture/build/index.js"]
    }
  }
}
```

---
Desenvolvido para o projeto **Sistema** com 🚀 por Antigravity.
