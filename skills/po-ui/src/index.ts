import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const server = new Server(
  {
    name: "skill-po-ui",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const PO_UI_LLMS_URL = "https://po-ui.io/llms.txt";
const PO_UI_BASE_DOCS_URL = "https://po-ui.io/llms-generated/";

/**
 * Ferramenta para listar componentes baseada no llms.txt
 */
async function listComponents() {
  try {
    const response = await axios.get(PO_UI_LLMS_URL);
    return response.data;
  } catch (error) {
    return "Erro ao buscar a lista de componentes do PO-UI.";
  }
}

/**
 * Ferramenta para buscar documentação específica
 */
async function getComponentDocs(componentName: string) {
  try {
    // Tenta converter PoButton em po-button
    const formattedName = componentName
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();
    const url = `${PO_UI_BASE_DOCS_URL}${formattedName}.md`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return `Documentação para o componente '${componentName}' não encontrada ou erro na conexão.`;
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_components",
        description: "Lista todos os componentes, serviços e interfaces do PO-UI.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_component_docs",
        description: "Obtém a documentação completa em Markdown de um componente PO-UI.",
        inputSchema: {
          type: "object",
          properties: {
            componentName: {
              type: "string",
              description: "Nome do componente (ex: PoButton, PoTable).",
            },
          },
          required: ["componentName"],
        },
      },
      {
        name: "search_docs",
        description: "Busca termos na documentação do PO-UI.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Termo de busca.",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_components":
      const components = await listComponents();
      return {
        content: [{ type: "text", text: components }],
      };

    case "get_component_docs":
      const docs = await getComponentDocs(String(args?.componentName));
      return {
        content: [{ type: "text", text: docs }],
      };

    case "search_docs":
      // Simplificado: retorna o link de busca ou busca no llms.txt
      return {
        content: [{ type: "text", text: `Busca por '${args?.query}'... Recomendamos consultar https://po-ui.io/documentation para resultados detalhados.` }],
      };

    default:
      throw new Error("Ferramenta não encontrada");
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Skill PO-UI MCP server running on stdio");
}

run().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
