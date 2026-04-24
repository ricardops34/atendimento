import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function test() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["./build/index.js"],
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  }, {
    capabilities: {}
  });

  await client.connect(transport);
  console.log("Conectado ao servidor MCP!");

  const tools = await client.listTools();
  console.log("Ferramentas encontradas:", tools.tools.map(t => t.name));

  console.log("\nTestando 'list_components'...");
  const result = await client.callTool({
    name: "list_components",
    arguments: {}
  });
  console.log("Resultado (primeiros 200 caracteres):", String(result.content[0].text).substring(0, 200) + "...");

  await transport.close();
}

test().catch(console.error);
