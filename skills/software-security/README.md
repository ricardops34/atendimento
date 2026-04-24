# 🛡️ Skill Software Security | DevSecOps Guardian

[![Powered by Antigravity](https://img.shields.io/badge/Powered%20by-Antigravity-blueviolet?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)
[![Methodology: EVO-METHOD](https://img.shields.io/badge/Methodology-EVO--METHOD-orange?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)

Esta skill é um especialista em **Segurança de Software**, focada em proteger aplicações contra ameaças modernas. Ela fornece ferramentas para auditoria de código, validação de autenticação e conformidade com os padrões da indústria (OWASP, LGPD).

---

## 💎 Ferramentas de Segurança

| Ferramenta | Descrição |
| :--- | :--- |
| `audit_owasp` | Analisa o código em busca de vulnerabilidades do OWASP Top 10. |
| `validate_auth_impl` | Verifica a segurança da implementação de Autenticação/Autorização. |
| `check_security_headers` | Valida a configuração de headers de segurança HTTP. |
| `data_privacy_advisor` | Fornece orientações sobre proteção de dados (LGPD/GDPR). |

---

## 🧠 Metodologia EVO-METHOD

Sob o **EVO-METHOD**, esta skill assume o papel de **Security Auditor**:
- **Proactive Defense**: Identifica riscos antes mesmo da implementação (Shift Left).
- **Hardening Guidance**: Sugere melhorias contínuas na postura de segurança do sistema.

---

## 🚀 Instalação

### Configuração no Antigravity / Claude
```json
{
  "mcpServers": {
    "software-security-skill": {
      "command": "node",
      "args": ["C:/Ricardo/opencode/sistema/skills/software-security/build/index.js"]
    }
  }
}
```

---
Desenvolvido para o projeto **Sistema** com 🛡️ por Antigravity.
