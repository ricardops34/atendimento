# 🚀 Skill PO-UI MCP | Evolution Edition

[![Powered by Antigravity](https://img.shields.io/badge/Powered%20by-Antigravity-blueviolet?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)
[![Methodology: EVO-METHOD](https://img.shields.io/badge/Methodology-EVO--METHOD-orange?style=for-the-badge)](https://github.com/EvolutionAPI/EVO-METHOD)

Uma skill de elite para o framework **PO-UI**, projetada sob os padrões de excelência **Antigravity/Codex** e fundamentada na metodologia **EVO-METHOD**. Esta skill transforma seu ambiente de desenvolvimento IA em um especialista profundo em componentes corporativos Angular.

---

## 💎 Visão Geral

Esta "Skill" (Servidor MCP) fornece um conjunto de ferramentas poderosas para agentes de IA (como Antigravity, Claude e VS Code) interagirem diretamente com o ecossistema PO-UI. Ela permite a descoberta de componentes, acesso instantâneo a documentações técnicas e geração de código seguindo as melhores práticas da TOTVS.

### 🌟 Diferenciais
- **Inteligência Adaptativa**: Alinhada com o EVO-METHOD, ajustando-se desde pequenas correções até arquiteturas complexas.
- **Padrão Codex**: Código limpo, tipado e documentação de nível industrial.
- **Integração Nativa**: Pronto para ser usado como um servidor MCP no seu fluxo de trabalho diário.

---

## 🛠️ Ferramentas Disponíveis

| Ferramenta | Descrição |
| :--- | :--- |
| `list_components` | Lista todos os componentes, serviços e interfaces disponíveis no PO-UI. |
| `get_component_docs` | Recupera a documentação Markdown completa de um componente específico. |
| `search_docs` | Realiza buscas inteligentes na base de conhecimento do PO-UI. |
| `get_guide` | Acessa guias de melhores práticas (ex: Instalação, Acessibilidade). |

---

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js v20 ou superior
- Uma IDE ou agente compatível com MCP (Antigravity recomendado)

### Passo 1: Clonar e Compilar
```bash
git clone https://github.com/ricardops34/po-ui.git
cd skill-po-ui
npm install
npm run build
```

### Passo 2: Configuração
Adicione o servidor MCP às configurações do seu agente (ex: Antigravity ou Claude Desktop).

Exemplo de configuração (ajuste o caminho para o diretório do projeto):

```json
{
  "mcpServers": {
    "po-ui-skill": {
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
```

---

## 🧠 Metodologia EVO-METHOD

Este projeto segue rigorosamente o **EVO-METHOD**, um módulo de desenvolvimento ágil orientado por IA.

1. **Análise Adaptativa**: O servidor MCP fornece contexto rico para que a IA planeje a implementação com base na complexidade.
2. **Workflows Estruturados**: As ferramentas são desenhadas para suportar as fases de análise, planejamento e arquitetura.
3. **Agentes Especializados**: Esta skill atua como o **Especialista em UI/UX de Frameworks**, garantindo que as interfaces sigam o Design System do PO-UI.

Para mais detalhes, visite: [EvolutionAPI/EVO-METHOD](https://github.com/EvolutionAPI/EVO-METHOD)

---

## 📜 Referências
- [Documentação Oficial PO-UI](https://po-ui.io)
- [MCP Specification](https://modelcontextprotocol.io)
- [EVO-METHOD GitHub](https://github.com/EvolutionAPI/EVO-METHOD)

---

Desenvolvido com ❤️ por **Antigravity** para a comunidade **EvolutionAPI**.
