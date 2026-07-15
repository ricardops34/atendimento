import * as mysql from 'mysql2/promise';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const DEFAULT_CONTRACT_START = new Date('2026-01-01');
const DEFAULT_CONTRACT_END = new Date('2026-12-31');
const DEFAULT_CONTRACT_TYPE = 'F';

async function bootstrap() {
  console.log('Starting Legacy Data Import...');

  let legacyDb;
  try {
    legacyDb = await mysql.createConnection({
      host: process.env.LEGACY_DB_HOST || 'localhost',
      user: process.env.LEGACY_DB_USER || 'root',
      password: process.env.LEGACY_DB_PASSWORD || 'root',
      database: process.env.LEGACY_DB_NAME || 'bjsoft18_portal'
    });
    console.log('Connected to legacy MySQL database.');

    // 1. Create Default Empresa
    let defaultEmpresa = await prisma.empresa.findFirst({ where: { slug: 'default' } });
    if (!defaultEmpresa) {
      defaultEmpresa = await prisma.empresa.create({
        data: { name: 'Empresa Fallback', slug: 'default' }
      });
      console.log('Created default empresa.');
    }
    const empresaId = defaultEmpresa.id;

    // 2. Setup Modules and Admin Profile
    const modules = ['dashboard', 'cadastros', 'agendamentos-calendario', 'agendamentos-list', 'configuracoes'];
    for (const key of modules) {
      await prisma.module.upsert({
        where: { key },
        update: {},
        create: { key, name: key }
      });
    }

    let adminProfile = await prisma.profile.findFirst({
      where: { name: 'Administrador' }
    });
    if (!adminProfile) {
      adminProfile = await prisma.profile.create({
        data: { name: 'Administrador' }
      });
      const allMenus = await prisma.menu.findMany();
      for (const menu of allMenus) {
        await prisma.profileMenu.create({
          data: { profileId: adminProfile.id, menuId: menu.id, canRead: true, canWrite: true }
        });
      }
      console.log('Created Admin profile with all menus.');
    }

    // 3. Fallback Admin User
    let adminUser = await prisma.user.findUnique({ where: { email: 'admin@fallback.com' } });
    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          name: 'Administrador (Fallback)',
          email: 'admin@fallback.com',
          profileId: adminProfile.id,
          password: 'hashed_password_placeholder', // Should be hashed with bcrypt in real app
          isActive: true
        }
      });
      console.log('Created fallback admin user.');
    }
    if (adminUser.profileId !== adminProfile.id) {
      adminUser = await prisma.user.update({
        where: { id: adminUser.id },
        data: { profileId: adminProfile.id }
      });
    }

    await prisma.userEmpresa.upsert({
      where: {
        userId_empresaId: {
          userId: adminUser.id,
          empresaId,
        },
      },
      update: {
        isDefault: true,
      },
      create: {
        userId: adminUser.id,
        empresaId,
        isDefault: true,
      },
    });

    // 4. Import Clientes
    console.log('Importing Clientes...');
    const [empresas]: any = await legacyDb.execute('SELECT * FROM empresa');
    for (const row of empresas) {
      await prisma.cliente.upsert({
        where: { id: row.id },
        update: { nome: row.nome_fantasia || row.razao_social || 'Sem Nome' },
        create: { id: row.id, empresaId, nome: row.nome_fantasia || row.razao_social || 'Sem Nome' }
      });
    }

    // 5. Import Profissionais
    console.log('Importing Profissionais...');
    const [profissionais]: any = await legacyDb.execute('SELECT * FROM profissional');
    for (const row of profissionais) {
      await prisma.profissional.upsert({
        where: { id: row.id },
        update: { nome: row.nome },
        create: { id: row.id, empresaId, nome: row.nome }
      });
    }

    // 6. Import Contratos
    console.log('Importing Contratos...');
    const [contratos]: any = await legacyDb.execute('SELECT * FROM contrato');
    for (const row of contratos) {
      if (!row.empresa_id) {
        console.warn(`Skipping Contrato ${row.id} because of missing empresa_id.`);
        continue;
      }
      await prisma.contrato.upsert({
        where: { id: row.id },
        update: {
          clienteId: row.empresa_id,
          descricao: row.descricao || 'Sem descrição',
          cor: row.cor || '#333333',
          dtInicio: row.dt_inicio ? new Date(row.dt_inicio) : DEFAULT_CONTRACT_START,
          dtFim: row.dt_fim ? new Date(row.dt_fim) : DEFAULT_CONTRACT_END,
          tipo: row.tipo || DEFAULT_CONTRACT_TYPE,
          isFeriado: row.id === 4 // Baseado no domain.md onde ID 4 é feriado
        },
        create: {
          id: row.id,
          empresaId,
          clienteId: row.empresa_id,
          descricao: row.descricao || 'Sem descrição',
          cor: row.cor || '#333333',
          dtInicio: row.dt_inicio ? new Date(row.dt_inicio) : DEFAULT_CONTRACT_START,
          dtFim: row.dt_fim ? new Date(row.dt_fim) : DEFAULT_CONTRACT_END,
          tipo: row.tipo || DEFAULT_CONTRACT_TYPE,
          isFeriado: row.id === 4
        }
      });
    }

    // 7. Import Contrato Items
    console.log('Importing Contrato Items...');
    const [contratoItems]: any = await legacyDb.execute('SELECT * FROM contrato_item');
    const formatTime = (t: string) => t ? t.substring(0, 5) : '00:00';
    for (const row of contratoItems) {
      if (!row.contrato_id || !row.profissional_id) {
        console.warn(`Skipping ContratoItem ${row.id} because of missing foreign keys.`);
        continue;
      }
      await prisma.contratoItem.upsert({
        where: { id: row.id },
        update: {
          contratoId: row.contrato_id,
          profissionalId: row.profissional_id,
          diaSemana: row.dia_semana,
          horaInicio: formatTime(row.hora_inicio),
          horaFim: formatTime(row.hora_fim),
          intervaloIni: formatTime(row.intervalo_ini),
          intervaloFim: formatTime(row.intervalo_fim)
        },
        create: {
          id: row.id,
          contratoId: row.contrato_id,
          profissionalId: row.profissional_id,
          diaSemana: row.dia_semana,
          horaInicio: formatTime(row.hora_inicio),
          horaFim: formatTime(row.hora_fim),
          intervaloIni: formatTime(row.intervalo_ini),
          intervaloFim: formatTime(row.intervalo_fim)
        }
      });
    }

    // 8. Import Agendamentos
    console.log('Importing Agendamentos...');
    const [agendamentos]: any = await legacyDb.execute('SELECT * FROM agendamento');
    let importedAgendamentos = 0;
    
    const timeToMinutes = (timeStr: string) => {
      if (!timeStr) return 0;
      const [h, m] = timeStr.split(':');
      return parseInt(h) * 60 + parseInt(m);
    };

    for (const row of agendamentos) {
      const duracaoTotal = timeToMinutes(row.hora_fim) - timeToMinutes(row.hora_inicio);
      const duracaoIntervalo = timeToMinutes(row.hora_intervalo_final) - timeToMinutes(row.hora_intervalo_inicial);
      let duracaoMinutos = duracaoTotal - duracaoIntervalo;
      if (isNaN(duracaoMinutos) || duracaoMinutos < 0) {
        duracaoMinutos = 0;
      }

      await prisma.agendamento.upsert({
        where: { id: row.id },
        update: {
          contratoId: row.contrato_id,
          profissionalId: row.profissional_id,
          descricao: row.descricao || '',
          dataAgenda: new Date(row.data_agenda),
          horaInicio: formatTime(row.hora_inicio),
          horaFim: formatTime(row.hora_fim),
          horaIntervaloInicial: formatTime(row.hora_intervalo_inicial),
          horaIntervaloFinal: formatTime(row.hora_intervalo_final),
          duracaoMinutos: duracaoMinutos,
          horarioInicial: new Date(row.horario_inicial),
          horarioFinal: new Date(row.horario_final),
          local: row.local || 'P',
          tipo: row.tipo || 'A',
          cor: row.cor || '#333333',
          observacao: row.observacao
        },
        create: {
          id: row.id,
          empresaId,
          contratoId: row.contrato_id,
          profissionalId: row.profissional_id,
          descricao: row.descricao || '',
          dataAgenda: new Date(row.data_agenda),
          horaInicio: formatTime(row.hora_inicio),
          horaFim: formatTime(row.hora_fim),
          horaIntervaloInicial: formatTime(row.hora_intervalo_inicial),
          horaIntervaloFinal: formatTime(row.hora_intervalo_final),
          duracaoMinutos: duracaoMinutos,
          horarioInicial: new Date(row.horario_inicial),
          horarioFinal: new Date(row.horario_final),
          local: row.local || 'P',
          tipo: row.tipo || 'A',
          cor: row.cor || '#333333',
          observacao: row.observacao
        }
      });
      importedAgendamentos++;
    }

    // 9. Import Realizados
    console.log('Importing Realizados...');
    const [realizados]: any = await legacyDb.execute('SELECT * FROM realizado');
    let importedRealizados = 0;
    for (const row of realizados) {
      await prisma.realizado.upsert({
        where: { id: row.id },
        update: {
          agendamentoId: row.agendamento_id,
          horasDecimais: row.horas
        },
        create: {
          id: row.id,
          agendamentoId: row.agendamento_id,
          horasDecimais: row.horas
        }
      });
      importedRealizados++;
    }

    console.log(`\nImport Summary:`);
    console.log(`- Empresas: ${empresas.length}`);
    console.log(`- Profissionais: ${profissionais.length}`);
    console.log(`- Contratos: ${contratos.length}`);
    console.log(`- Escalas: ${contratoItems.length}`);
    console.log(`- Agendamentos: ${importedAgendamentos}`);
    console.log(`- Realizados: ${importedRealizados}`);
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    if (legacyDb) await legacyDb.end();
    await prisma.$disconnect();
  }
}

bootstrap();
