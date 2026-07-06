/**
 * Script para popular a tabela `municipios` com dados do IBGE.
 * Execução: npx ts-node scripts/seed-ibge-municipios.ts
 *
 * Fonte: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

async function fetchMunicipios(uf: string): Promise<{ id: number; nome: string }[]> {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar ${uf}: ${res.status}`);
  const data = await res.json() as any[];
  return (data as any[]).map((m: any) => ({ id: m.id as number, nome: m.nome as string }));
}

async function main() {
  console.log('Buscando estados no banco...');
  const estados = await prisma.estado.findMany();
  const estadoMap = new Map(estados.map((e: any) => [e.sigla, e.id]));

  for (const uf of UFS) {
    const estadoId = estadoMap.get(uf);
    if (!estadoId) { console.warn(`Estado ${uf} não encontrado no banco.`); continue; }

    console.log(`Processando ${uf}...`);
    try {
      const municipios = await fetchMunicipios(uf);
      let inserted = 0;
      for (const m of municipios) {
        await prisma.municipio.upsert({
          where: { id: m.id },
          create: { id: m.id, estadoId, nome: m.nome },
          update: { nome: m.nome },
        });
        inserted++;
      }
      console.log(`  ${uf}: ${inserted} municípios inseridos/atualizados`);
    } catch (err) {
      console.error(`  Erro em ${uf}:`, err);
    }
  }

  const total = await prisma.municipio.count();
  console.log(`\nTotal de municípios no banco: ${total}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
