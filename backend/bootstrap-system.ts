import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';

dotenv.config();

type Step = {
  label: string;
  command: string;
  args: string[];
};

function runStep(step: Step) {
  console.log(`\n==> ${step.label}`);

  const result = spawnSync(step.command, step.args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    cwd: process.cwd(),
    env: process.env,
  });

  if (result.status !== 0) {
    throw new Error(`Falha ao executar: ${step.command} ${step.args.join(' ')}`);
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL nao definida.');
  }

  console.log('==> Bootstrap do sistema');

  if (!existsSync('node_modules')) {
    runStep({
      label: 'Instalando dependencias',
      command: 'npm',
      args: ['install'],
    });
  }

  const steps: Step[] = [
    {
      label: 'Gerando Prisma Client',
      command: 'npx',
      args: ['prisma', 'generate'],
    },
    {
      label: 'Aplicando migrations',
      command: 'npx',
      args: ['prisma', 'migrate', 'deploy'],
    },
    {
      label: 'Sincronizando schema atual',
      command: 'npx',
      args: ['prisma', 'db', 'push'],
    },
    {
      label: 'Regenerando Prisma Client',
      command: 'npx',
      args: ['prisma', 'generate'],
    },
    {
      label: 'Populando tabelas do sistema',
      command: 'npx',
      args: ['--yes', 'tsx', 'prisma/seed.ts'],
    },
  ];

  for (const step of steps) {
    runStep(step);
  }

  console.log('\n==> Bootstrap do sistema concluido');
}

main().catch((error) => {
  console.error('\nErro no bootstrap do sistema:', error.message);
  process.exit(1);
});
