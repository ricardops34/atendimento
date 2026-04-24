# 🛠️ Guia de Instalação Detalhado

Siga estes passos para configurar a Skill PO-UI no seu ambiente.

## 1. Clonar o Repositório
O código deve ser mantido localmente para que o servidor MCP possa ser executado via stdio.

```bash
# Navegue até o diretório de seus projetos
git clone https://github.com/ricardops34/po-ui.git skill-po-ui
cd skill-po-ui
```

## 2. Instalar Dependências e Compilar
Certifique-se de ter o Node.js v20+ instalado.

```bash
npm install
npm run build
```

### Antigravity / Claude Desktop
Edite as configurações de MCP do seu agente. No Antigravity, isso pode ser feito via interface ou arquivo de configuração. No Claude Desktop, edite o arquivo `claude_desktop_config.json` (geralmente em `%APPDATA%\Claude\config.json` no Windows):

```json
{
  "mcpServers": {
    "po-ui-skill": {
      "command": "node",
      "args": ["/caminho/para/o/projeto/skill-po-ui/build/index.js"]
    }
  }
}
```
> [!TIP]
> Substitua `/caminho/para/o/projeto/` pelo caminho real onde você clonou o repositório.

## 4. Testando a Skill
No chat da sua IA, você pode perguntar:
- "Liste os componentes disponíveis no PO-UI."
- "Como eu uso o componente PoTable? Me mostre a documentação."
- "Quais são as propriedades do PoNotificationService?"

A IA deverá utilizar as ferramentas `list_components` e `get_component_docs` automaticamente.
