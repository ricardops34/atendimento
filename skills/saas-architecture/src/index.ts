import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "skill-saas-architecture",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "analyze_isolation",
        description: "Analisa a estratégia de isolamento de dados sugerida ou existente.",
        inputSchema: {
          type: "object",
          properties: {
            strategy: {
              type: "string",
              enum: ["shared-database", "schema-per-tenant", "database-per-tenant"],
              description: "Estratégia de isolamento sendo analisada.",
            },
          },
          required: ["strategy"],
        },
      },
      {
        name: "validate_tenant_filter",
        description: "Verifica se um trecho de código SQL ou código ORM aplica corretamente filtros de tenant.",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "Código para análise.",
            },
          },
          required: ["code"],
        },
      },
      {
        name: "get_saas_best_practices",
        description: "Retorna guias e melhores práticas para arquitetura SaaS multi-tenant.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              enum: ["security", "scalability", "caching", "migrations"],
              description: "Tópico de interesse.",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "analyze_isolation":
      return {
        content: [{ 
          type: "text", 
          text: `Análise da estratégia '${args?.strategy}':\n- Prós: ...\n- Contras: ...\n- Recomendação: ... (Simulação de análise de engenharia)` 
        }],
      };

    case "validate_tenant_filter":
      const code = String(args?.code);
      const hasTenant = code.toLowerCase().includes("tenant_id") || code.toLowerCase().includes("where");
      return {
        content: [{ 
          type: "text", 
          text: hasTenant 
            ? "O código parece incluir filtros. Certifique-se de que o tenant_id venha de uma fonte segura (contexto do request)." 
            : "ALERTA: Filtro de tenant não detectado no código fornecido. Risco de vazamento de dados entre tenants!" 
        }],
      };

    case "get_saas_best_practices":
      return {
        content: [{ 
          type: "text", 
          text: "Melhores práticas SaaS: Use Row-Level Security no DB, propague o tenant_id via AsyncLocalStorage no Node.js, e utilize caches isolados por prefixo de tenant." 
        }],
      };

    default:
      throw new Error("Ferramenta não encontrada");
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SaaS Architecture MCP server running");
}

run().catch(console.error);
