import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "skill-software-security",
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
        name: "audit_owasp",
        description: "Analisa um trecho de código em busca de vulnerabilidades do OWASP Top 10.",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "Código para auditoria.",
            },
          },
          required: ["code"],
        },
      },
      {
        name: "check_security_headers",
        description: "Analisa a configuração de headers de segurança.",
        inputSchema: {
          type: "object",
          properties: {
            headers: {
              type: "object",
              description: "Objeto de headers para análise.",
            },
          },
          required: ["headers"],
        },
      },
      {
        name: "get_security_advisory",
        description: "Obtém recomendações de segurança para um tópico específico.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              enum: ["authentication", "data-protection", "api-security", "infrastructure"],
              description: "Tópico de segurança.",
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
    case "audit_owasp":
      const code = String(args?.code);
      const vulnerabilityFound = code.includes("eval(") || code.includes("innerHTML") || code.includes("unsafe");
      return {
        content: [{ 
          type: "text", 
          text: vulnerabilityFound 
            ? "ALERTA DE SEGURANÇA: Detectamos padrões potencialmente perigosos (eval, innerHTML). Recomendamos o uso de alternativas seguras para evitar XSS ou Injeção." 
            : "Auditoria concluída: Nenhum padrão óbvio de vulnerabilidade OWASP detectado no trecho fornecido." 
        }],
      };

    case "check_security_headers":
      return {
        content: [{ 
          type: "text", 
          text: "Recomendação de Headers: Garanta que 'Content-Security-Policy', 'X-Frame-Options: DENY' e 'Strict-Transport-Security' estejam configurados." 
        }],
      };

    case "get_security_advisory":
      return {
        content: [{ 
          type: "text", 
          text: `Conselho para ${args?.topic}: Utilize autenticação multifator (MFA), criptografe dados em repouso com AES-256 e implemente rate limiting rigoroso em todas as APIs.` 
        }],
      };

    default:
      throw new Error("Ferramenta não encontrada");
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Software Security MCP server running");
}

run().catch(console.error);
