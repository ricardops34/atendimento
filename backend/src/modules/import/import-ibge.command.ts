import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {
  console.log('Iniciando importação de dados do IBGE...');

  try {
    // 1. Importar Estados
    console.log('Buscando estados do IBGE...');
    const resEstados = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const estados = await resEstados.json();

    console.log(`Encontrados ${estados.length} estados. Salvando no banco...`);
    for (const estado of estados) {
      await prisma.estado.upsert({
        where: { id: estado.id },
        update: {
          nome: String(estado.nome),
          sigla: String(estado.sigla),
        },
        create: {
          id: estado.id,
          nome: String(estado.nome),
          sigla: String(estado.sigla),
        },
      });
    }
    console.log('Estados salvos com sucesso!');

    // 2. Importar Municípios
    console.log('Buscando municípios do IBGE...');
    const resMunicipios = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
    const municipios: any[] = await resMunicipios.json();

    console.log(`Encontrados ${municipios.length} municípios. Salvando no banco... (Isso pode demorar alguns minutos)`);
    
    const chunkSize = 500;
    for (let i = 0; i < municipios.length; i += chunkSize) {
      const chunk = municipios.slice(i, i + chunkSize);
      
      await prisma.$transaction(
        chunk.map(municipio => {
          const ufId = municipio.microrregiao?.mesorregiao?.UF?.id 
            || municipio['regiao-imediata']?.['regiao-intermediaria']?.UF?.id;

          return prisma.municipio.upsert({
            where: { id: municipio.id },
            update: {
              nome: String(municipio.nome),
              estadoId: ufId,
            },
            create: {
              id: municipio.id,
              nome: String(municipio.nome),
              estadoId: ufId,
            },
          });
        })
      );
      console.log(`Progresso: ${Math.min(i + chunkSize, municipios.length)} / ${municipios.length}`);
    }
    
    console.log('Municípios salvos com sucesso!');
    console.log('Importação finalizada!');

  } catch (error) {
    console.error('Erro ao importar dados do IBGE:', error);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
