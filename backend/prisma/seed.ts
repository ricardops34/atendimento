// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MVP modules and default access...');

  const moduleKeys = [
    'dashboard',
    'cadastros',
    'companies',
    'professionals',
    'contracts',
    'holidays',
    'appointments-calendar',
    'appointments-list',
    'settings',
  ];

  for (const key of moduleKeys) {
    await prisma.module.upsert({
      where: { key },
      update: {},
      create: { key, name: key },
    });
  }
  const allModules = await prisma.module.findMany();

  const defaultRoutines = [
    { moduleKey: 'cadastros', name: 'Cadastros', key: 'cadastros-home', path: '/cadastros', icon: 'an an-folders', shortLabel: 'CAD', sortOrder: 10 },
    { moduleKey: 'companies', name: 'Clientes', key: 'companies-list', path: '/clientes', icon: 'an an-buildings', shortLabel: 'CLI', sortOrder: 11 },
    { moduleKey: 'professionals', name: 'Profissionais', key: 'professionals-list', path: '/profissionais', icon: 'an an-user', shortLabel: 'PRO', sortOrder: 12 },
    { moduleKey: 'contracts', name: 'Contratos', key: 'contracts-list', path: '/contratos', icon: 'an an-file-text', shortLabel: 'CON', sortOrder: 13 },
    { moduleKey: 'holidays', name: 'Feriados', key: 'holidays-list', path: '/feriados', icon: 'an an-calendar-x', shortLabel: 'FER', sortOrder: 14 },
    { moduleKey: 'appointments-list', name: 'Lista de Atendimentos', key: 'appointments-list', path: '/agendamentos/lista', icon: 'an an-list-dashes', shortLabel: 'LST', sortOrder: 40 },
    { moduleKey: 'appointments-calendar', name: 'Calendario', key: 'appointments-calendar', path: '/agendamentos/calendario', icon: 'an an-calendar-blank', shortLabel: 'CAL', sortOrder: 50 },
    { moduleKey: 'settings', name: 'Configuracoes', key: 'settings-home', path: '/configuracoes', icon: 'an an-gear', shortLabel: 'CFG', sortOrder: 60 },
    { moduleKey: 'settings', name: 'Empresas', key: 'settings-empresas', path: '/configuracoes/empresas', icon: 'an an-buildings', shortLabel: 'EMP', sortOrder: 61 },
    { moduleKey: 'settings', name: 'Modulos', key: 'settings-modules', path: '/configuracoes/modulos', icon: 'an an-squares-four', shortLabel: 'MOD', sortOrder: 62 },
    { moduleKey: 'settings', name: 'Rotinas', key: 'settings-routines', path: '/configuracoes/rotinas', icon: 'an an-list-checks', shortLabel: 'ROT', sortOrder: 63 },
    { moduleKey: 'settings', name: 'Perfis', key: 'settings-profiles', path: '/configuracoes/perfis', icon: 'an an-identification-card', shortLabel: 'PRF', sortOrder: 64 },
    { moduleKey: 'settings', name: 'Menus', key: 'settings-menus', path: '/configuracoes/menus', icon: 'an an-tree-structure', shortLabel: 'MNU', sortOrder: 65 },
    { moduleKey: 'settings', name: 'Usuarios', key: 'settings-users', path: '/configuracoes/usuarios', icon: 'an an-users-three', shortLabel: 'USR', sortOrder: 66 },
    { moduleKey: 'settings', name: 'Estados', key: 'settings-estados', path: '/configuracoes/estados', icon: 'an an-map-trifold', shortLabel: 'UF', sortOrder: 67 },
    { moduleKey: 'settings', name: 'Municípios', key: 'settings-municipios', path: '/configuracoes/municipios', icon: 'an an-map-pin', shortLabel: 'MUN', sortOrder: 68 },
    { moduleKey: 'settings', name: 'CEPs', key: 'settings-ceps', path: '/configuracoes/ceps', icon: 'an an-mailbox', shortLabel: 'CEP', sortOrder: 69 },
    { moduleKey: 'settings', name: 'Países', key: 'settings-paises', path: '/configuracoes/paises', icon: 'an an-globe', shortLabel: 'PAI', sortOrder: 70 },
  ];

  for (const routine of defaultRoutines) {
    const moduleRef = allModules.find((item) => item.key === routine.moduleKey);
    if (!moduleRef) {
      continue;
    }

    await prisma.routine.upsert({
      where: { key: routine.key },
      update: {
        moduleId: moduleRef.id,
        name: routine.name,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
      create: {
        moduleId: moduleRef.id,
        name: routine.name,
        key: routine.key,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
    });
  }

  const allRoutines = await prisma.routine.findMany({
    include: { module: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  const ensureMenu = async (key: string, data: any) => {
    const existing = await prisma.menu.findFirst({
      where: {
        OR: [
          data.routineId ? { routineId: data.routineId } : undefined,
          { link: key },
          { label: key },
        ].filter(Boolean) as any,
      },
    });

    if (existing) {
      return prisma.menu.update({
        where: { id: existing.id },
        data,
      });
    }

    return prisma.menu.create({ data });
  };

  const cadastrosHomeRoutine = allRoutines.find((item) => item.key === 'cadastros-home');
  const companiesRoutine = allRoutines.find((item) => item.key === 'companies-list');
  const professionalsRoutine = allRoutines.find((item) => item.key === 'professionals-list');
  const contractsRoutine = allRoutines.find((item) => item.key === 'contracts-list');
  const holidaysRoutine = allRoutines.find((item) => item.key === 'holidays-list');
  const appointmentsListRoutine = allRoutines.find((item) => item.key === 'appointments-list');
  const appointmentsCalendarRoutine = allRoutines.find((item) => item.key === 'appointments-calendar');
  const settingsHomeRoutine = allRoutines.find((item) => item.key === 'settings-home');
  const settingsEmpresasRoutine = allRoutines.find((item) => item.key === 'settings-empresas');
  const settingsModulesRoutine = allRoutines.find((item) => item.key === 'settings-modules');
  const settingsRoutinesRoutine = allRoutines.find((item) => item.key === 'settings-routines');
  const settingsProfilesRoutine = allRoutines.find((item) => item.key === 'settings-profiles');
  const settingsMenusRoutine = allRoutines.find((item) => item.key === 'settings-menus');
  const settingsUsersRoutine = allRoutines.find((item) => item.key === 'settings-users');
  const settingsEstadosRoutine = allRoutines.find((item) => item.key === 'settings-estados');
  const settingsMunicipiosRoutine = allRoutines.find((item) => item.key === 'settings-municipios');
  const settingsCepsRoutine = allRoutines.find((item) => item.key === 'settings-ceps');
  const settingsPaisesRoutine = allRoutines.find((item) => item.key === 'settings-paises');

  await ensureMenu('/', {
    label: 'Inicio',
    shortLabel: 'INI',
    icon: 'an an-house',
    link: '/',
    sortOrder: 1,
    isActive: true,
  });

  let cadastrosMenuId: number | null = null;

  if (cadastrosHomeRoutine) {
    const cadastrosMenu = await ensureMenu(cadastrosHomeRoutine.path, {
      moduleId: cadastrosHomeRoutine.moduleId,
      routineId: cadastrosHomeRoutine.id,
      label: cadastrosHomeRoutine.name,
      shortLabel: cadastrosHomeRoutine.shortLabel,
      icon: cadastrosHomeRoutine.icon,
      link: null, // parent
      sortOrder: cadastrosHomeRoutine.sortOrder,
      isActive: true,
    });
    cadastrosMenuId = cadastrosMenu.id;
  }

  for (const routine of [
    companiesRoutine,
    professionalsRoutine,
    contractsRoutine,
    holidaysRoutine,
  ]) {
    if (!routine) continue;
    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: cadastrosMenuId,
      label: routine.name,
      shortLabel: routine.shortLabel,
      icon: routine.icon,
      link: routine.path,
      sortOrder: routine.sortOrder,
      isActive: true,
    });
  }

  if (appointmentsListRoutine) {
    await ensureMenu(appointmentsListRoutine.path, {
      moduleId: appointmentsListRoutine.moduleId,
      routineId: appointmentsListRoutine.id,
      label: appointmentsListRoutine.name,
      shortLabel: appointmentsListRoutine.shortLabel,
      icon: appointmentsListRoutine.icon,
      link: appointmentsListRoutine.path,
      sortOrder: appointmentsListRoutine.sortOrder,
      isActive: true,
    });
  }

  if (appointmentsCalendarRoutine) {
    await ensureMenu(appointmentsCalendarRoutine.path, {
      moduleId: appointmentsCalendarRoutine.moduleId,
      routineId: appointmentsCalendarRoutine.id,
      label: appointmentsCalendarRoutine.name,
      shortLabel: appointmentsCalendarRoutine.shortLabel,
      icon: appointmentsCalendarRoutine.icon,
      link: appointmentsCalendarRoutine.path,
      sortOrder: appointmentsCalendarRoutine.sortOrder,
      isActive: true,
    });
  }

  let settingsMenuId: number | null = null;

  if (settingsHomeRoutine) {
    const settingsMenu = await ensureMenu(settingsHomeRoutine.path, {
      moduleId: settingsHomeRoutine.moduleId,
      routineId: settingsHomeRoutine.id,
      label: settingsHomeRoutine.name,
      shortLabel: settingsHomeRoutine.shortLabel,
      icon: settingsHomeRoutine.icon,
      link: null,
      sortOrder: settingsHomeRoutine.sortOrder,
      isActive: true,
    });
    settingsMenuId = settingsMenu.id;
  }

  for (const routine of [
    settingsEmpresasRoutine,
    settingsModulesRoutine,
    settingsRoutinesRoutine,
    settingsProfilesRoutine,
    settingsMenusRoutine,
    settingsUsersRoutine,
    settingsEstadosRoutine,
    settingsMunicipiosRoutine,
    settingsCepsRoutine,
    settingsPaisesRoutine,
  ]) {
    if (!routine) {
      continue;
    }

    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: settingsMenuId,
      label: routine.name,
      shortLabel: routine.shortLabel,
      icon: routine.icon,
      link: routine.path,
      sortOrder: routine.sortOrder,
      isActive: true,
    });
  }

  // 2. Empresa Default
  const empresa = await prisma.empresa.upsert({
    where: { slug: 'empresa-padrao' },
    update: { name: 'Empresa Padrão' },
    create: {
      name: 'Empresa Padrão',
      slug: 'empresa-padrao',
    },
  });

  // 3. Perfil Administrador
  const profile = await prisma.profile.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: {
      name: 'Administrador',
    },
  });

  // Vincula o perfil a todos os módulos
  for (const mod of allModules) {
    await prisma.profileModule.upsert({
      where: {
        profileId_moduleId: {
          profileId: profile.id,
          moduleId: mod.id,
        },
      },
      update: { canRead: true, canWrite: true },
      create: {
        profileId: profile.id,
        moduleId: mod.id,
        canRead: true,
        canWrite: true,
      },
    });
  }

  // 4. Usuário Admin Inicial
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@fallback.com' },
    update: {
      profileId: profile.id,
      // password: hashedPassword,
    },
    create: {
      name: 'Administrador (Fallback)',
      email: 'admin@fallback.com',
      profileId: profile.id,
      avatar: 'avatar_01.png',
      password: hashedPassword,
      isActive: true,
    },
  });

  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@fallback.com' },
  });

  if (adminUser) {
    await prisma.userEmpresa.upsert({
      where: {
        userId_empresaId: {
          userId: adminUser.id,
          empresaId: empresa.id,
        },
      },
      update: {
        isDefault: true,
      },
      create: {
        userId: adminUser.id,
        empresaId: empresa.id,
        isDefault: true,
      },
    });
  }

  // 5. Feriados (2026 e 2027)
  const feriadosNacionais = [
    // 2026 Fixos
    { data: new Date('2026-01-01T00:00:00Z'), descricao: 'Confraternização Universal', tipo: 'N' },
    { data: new Date('2026-04-21T00:00:00Z'), descricao: 'Tiradentes', tipo: 'N' },
    { data: new Date('2026-05-01T00:00:00Z'), descricao: 'Dia do Trabalho', tipo: 'N' },
    { data: new Date('2026-09-07T00:00:00Z'), descricao: 'Independência do Brasil', tipo: 'N' },
    { data: new Date('2026-10-12T00:00:00Z'), descricao: 'Nossa Sr.a Aparecida', tipo: 'N' },
    { data: new Date('2026-11-02T00:00:00Z'), descricao: 'Finados', tipo: 'N' },
    { data: new Date('2026-11-15T00:00:00Z'), descricao: 'Proclamação da República', tipo: 'N' },
    { data: new Date('2026-12-25T00:00:00Z'), descricao: 'Natal', tipo: 'N' },
    // 2026 Móveis
    { data: new Date('2026-02-17T00:00:00Z'), descricao: 'Carnaval', tipo: 'N', fixo: false },
    { data: new Date('2026-04-03T00:00:00Z'), descricao: 'Paixão de Cristo', tipo: 'N', fixo: false },
    { data: new Date('2026-06-04T00:00:00Z'), descricao: 'Corpus Christi', tipo: 'N', fixo: false },
    
    // 2027 Fixos
    { data: new Date('2027-01-01T00:00:00Z'), descricao: 'Confraternização Universal', tipo: 'N' },
    { data: new Date('2027-04-21T00:00:00Z'), descricao: 'Tiradentes', tipo: 'N' },
    { data: new Date('2027-05-01T00:00:00Z'), descricao: 'Dia do Trabalho', tipo: 'N' },
    { data: new Date('2027-09-07T00:00:00Z'), descricao: 'Independência do Brasil', tipo: 'N' },
    { data: new Date('2027-10-12T00:00:00Z'), descricao: 'Nossa Sr.a Aparecida', tipo: 'N' },
    { data: new Date('2027-11-02T00:00:00Z'), descricao: 'Finados', tipo: 'N' },
    { data: new Date('2027-11-15T00:00:00Z'), descricao: 'Proclamação da República', tipo: 'N' },
    { data: new Date('2027-12-25T00:00:00Z'), descricao: 'Natal', tipo: 'N' },
    // 2027 Móveis
    { data: new Date('2027-02-09T00:00:00Z'), descricao: 'Carnaval', tipo: 'N', fixo: false },
    { data: new Date('2027-03-26T00:00:00Z'), descricao: 'Paixão de Cristo', tipo: 'N', fixo: false },
    { data: new Date('2027-05-27T00:00:00Z'), descricao: 'Corpus Christi', tipo: 'N', fixo: false },
  ];

  for (const feriado of feriadosNacionais) {
    await prisma.feriado.upsert({
      where: {
        empresaId_data: {
          empresaId: empresa.id,
          data: feriado.data,
        },
      },
      update: {},
      create: {
        empresaId: empresa.id,
        data: feriado.data,
        descricao: feriado.descricao,
        tipo: feriado.tipo,
        fixo: feriado.fixo ?? true,
      },
    });
  }

  // 6. IBGE Data (Estados e Municipios)
  console.log('Fetching IBGE data for Estados...');
  try {
    const estadosRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    if (estadosRes.ok) {
      const estados = await estadosRes.json();
      console.log(`Loaded ${estados.length} estados from IBGE API. Saving...`);
      for (const estado of estados) {
        await prisma.estado.upsert({
          where: { id: estado.id },
          update: { nome: estado.nome, sigla: estado.sigla },
          create: { id: estado.id, nome: estado.nome, sigla: estado.sigla },
        });
      }

      console.log('Fetching IBGE data for Municipios...');
      const municipiosRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
      if (municipiosRes.ok) {
        const municipios = await municipiosRes.json();
        console.log(`Loaded ${municipios.length} municipios from IBGE API. Saving (this may take a few seconds)...`);
        
        // Optimizing inserts using createMany where possible, or transacting
        // Since we want upsert (idempotent), we can map to a batch
        for (const mun of municipios) {
          const estadoId = mun.microrregiao?.mesorregiao?.UF?.id || mun['regiao-imediata']?.['regiao-intermediaria']?.UF?.id;
          if (!estadoId) {
            console.warn(`Could not determine estadoId for municipio ${mun.nome}`);
            continue;
          }
          await prisma.municipio.upsert({
            where: { id: mun.id },
            update: { nome: mun.nome, estadoId: estadoId },
            create: { id: mun.id, nome: mun.nome, estadoId: estadoId },
          });
        }
      } else {
        console.warn('Failed to fetch Municipios from IBGE');
      }
    } else {
      console.warn('Failed to fetch Estados from IBGE');
    }
  } catch (error) {
    console.error('Error fetching IBGE data:', error);
  }

  // 7. IBGE Data (Paises)
  console.log('Fetching IBGE data for Paises...');
  try {
    const paisesRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises');
    if (paisesRes.ok) {
      const paises = await paisesRes.json();
      console.log(`Loaded ${paises.length} paises from IBGE API. Saving...`);
      for (const pais of paises) {
        const id = pais.id?.M49;
        const sigla = pais.id?.['ISO-ALPHA-2'];
        const nome = pais.nome;
        
        if (id && sigla) {
          await prisma.pais.upsert({
            where: { id: id },
            update: { nome: nome, sigla: sigla },
            create: { id: id, nome: nome, sigla: sigla },
          });
        }
      }
    } else {
      console.warn('Failed to fetch Paises from IBGE');
    }
  } catch (error) {
    console.error('Error fetching IBGE data for Paises:', error);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
