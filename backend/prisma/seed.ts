// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MVP modules and default access...');

  const modules = [
    { key: 'dashboard', name: 'Inicio' },
    { key: 'basicos', name: 'Básicos' },
    { key: 'cadastros', name: 'Cadastro' },
    { key: 'atendimentos', name: 'Atendimentos' },
    { key: 'configuracoes', name: 'Configuração' },
    { key: 'usuarios', name: 'Usuário' },
  ];

  for (const { key, name } of modules) {
    await prisma.module.upsert({
      where: { key },
      update: { name },
      create: { key, name },
    });
  }
  const allModules = await prisma.module.findMany();

  const defaultRoutines = [
    { moduleKey: 'dashboard', name: 'Dashboard', key: 'dashboard-home', path: '/dashboard', icon: 'an an-gauge', shortLabel: 'DSH', sortOrder: 2 },
    { moduleKey: 'basicos', name: 'Estados', key: 'configuracoes-estados', path: '/configuracoes/estados', icon: 'an an-map-trifold', shortLabel: 'UF', sortOrder: 21 },
    { moduleKey: 'basicos', name: 'Municípios', key: 'configuracoes-municipios', path: '/configuracoes/municipios', icon: 'an an-map-pin', shortLabel: 'MUN', sortOrder: 22 },
    { moduleKey: 'basicos', name: 'CEP', key: 'configuracoes-ceps', path: '/configuracoes/ceps', icon: 'an an-mailbox', shortLabel: 'CEP', sortOrder: 23 },
    { moduleKey: 'basicos', name: 'Países', key: 'configuracoes-paises', path: '/configuracoes/paises', icon: 'an an-globe', shortLabel: 'PAI', sortOrder: 24 },
    { moduleKey: 'cadastros', name: 'Cadastro', key: 'cadastros-home', path: '/cadastros', icon: 'an an-folders', shortLabel: 'CAD', sortOrder: 10 },
    { moduleKey: 'cadastros', name: 'Clientes', key: 'clientes-list', path: '/clientes', icon: 'an an-buildings', shortLabel: 'CLI', sortOrder: 11 },
    { moduleKey: 'cadastros', name: 'Profissionais', key: 'profissionais-list', path: '/profissionais', icon: 'an an-user', shortLabel: 'PRO', sortOrder: 12 },
    { moduleKey: 'cadastros', name: 'Contratos', key: 'contratos-list', path: '/contratos', icon: 'an an-file-text', shortLabel: 'CON', sortOrder: 13 },
    { moduleKey: 'cadastros', name: 'Feriados', key: 'feriados-list', path: '/feriados', icon: 'an an-calendar-x', shortLabel: 'FER', sortOrder: 14 },
    { moduleKey: 'cadastros', name: 'Atributos', key: 'atributos-list', path: '/atributos', icon: 'an an-list-checks', shortLabel: 'ATR', sortOrder: 15 },
    { moduleKey: 'atendimentos', name: 'Atendimentos', key: 'agendamentos-list', path: '/agendamentos/lista', icon: 'an an-list-dashes', shortLabel: 'LST', sortOrder: 40 },
    { moduleKey: 'atendimentos', name: 'Calendário', key: 'agendamentos-calendario', path: '/agendamentos/calendario', icon: 'an an-calendar-blank', shortLabel: 'CAL', sortOrder: 41 },
    { moduleKey: 'configuracoes', name: 'Configuração', key: 'configuracoes-home', path: '/configuracoes', icon: 'an an-gear', shortLabel: 'CFG', sortOrder: 60 },
    { moduleKey: 'configuracoes', name: 'Empresas', key: 'configuracoes-empresas', path: '/configuracoes/empresas', icon: 'an an-buildings', shortLabel: 'EMP', sortOrder: 61 },
    { moduleKey: 'configuracoes', name: 'Módulos', key: 'configuracoes-modulos', path: '/configuracoes/modulos', icon: 'an an-squares-four', shortLabel: 'MOD', sortOrder: 62 },
    { moduleKey: 'configuracoes', name: 'Rotinas', key: 'configuracoes-rotinas', path: '/configuracoes/rotinas', icon: 'an an-list-checks', shortLabel: 'ROT', sortOrder: 63 },
    { moduleKey: 'configuracoes', name: 'Menu', key: 'configuracoes-menus', path: '/configuracoes/menus', icon: 'an an-tree-structure', shortLabel: 'MNU', sortOrder: 64 },
    { moduleKey: 'usuarios', name: 'Perfil', key: 'configuracoes-perfis', path: '/configuracoes/perfis', icon: 'an an-identification-card', shortLabel: 'PRF', sortOrder: 80 },
    { moduleKey: 'usuarios', name: 'Usuário', key: 'configuracoes-usuarios', path: '/configuracoes/usuarios', icon: 'an an-users-three', shortLabel: 'USR', sortOrder: 81 },
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

  const dashboardRoutine = allRoutines.find((item) => item.key === 'dashboard-home');
  const cadastrosHomeRoutine = allRoutines.find((item) => item.key === 'cadastros-home');
  const companiesRoutine = allRoutines.find((item) => item.key === 'clientes-list');
  const professionalsRoutine = allRoutines.find((item) => item.key === 'profissionais-list');
  const contractsRoutine = allRoutines.find((item) => item.key === 'contratos-list');
  const holidaysRoutine = allRoutines.find((item) => item.key === 'feriados-list');
  const attributesRoutine = allRoutines.find((item) => item.key === 'atributos-list');
  const appointmentsListRoutine = allRoutines.find((item) => item.key === 'agendamentos-list');
  const appointmentsCalendarRoutine = allRoutines.find((item) => item.key === 'agendamentos-calendario');
  const settingsHomeRoutine = allRoutines.find((item) => item.key === 'configuracoes-home');
  const settingsEmpresasRoutine = allRoutines.find((item) => item.key === 'configuracoes-empresas');
  const settingsModulesRoutine = allRoutines.find((item) => item.key === 'configuracoes-modulos');
  const settingsRoutinesRoutine = allRoutines.find((item) => item.key === 'configuracoes-rotinas');
  const settingsMenusRoutine = allRoutines.find((item) => item.key === 'configuracoes-menus');
  const settingsProfilesRoutine = allRoutines.find((item) => item.key === 'configuracoes-perfis');
  const settingsUsersRoutine = allRoutines.find((item) => item.key === 'configuracoes-usuarios');
  const settingsEstadosRoutine = allRoutines.find((item) => item.key === 'configuracoes-estados');
  const settingsMunicipiosRoutine = allRoutines.find((item) => item.key === 'configuracoes-municipios');
  const settingsCepsRoutine = allRoutines.find((item) => item.key === 'configuracoes-ceps');
  const settingsPaisesRoutine = allRoutines.find((item) => item.key === 'configuracoes-paises');

  await ensureMenu('/', {
    label: 'Inicio',
    shortLabel: 'INI',
    icon: 'an an-house',
    link: '/',
    sortOrder: 1,
    isActive: true,
  });

  if (dashboardRoutine) {
    await ensureMenu(dashboardRoutine.path, {
      moduleId: dashboardRoutine.moduleId,
      routineId: dashboardRoutine.id,
      label: dashboardRoutine.name,
      shortLabel: dashboardRoutine.shortLabel,
      icon: dashboardRoutine.icon,
      link: dashboardRoutine.path,
      sortOrder: dashboardRoutine.sortOrder,
      isActive: true,
    });
  }

  const basicosModule = allModules.find((item) => item.key === 'basicos');
  let basicosMenuId: number | null = null;
  if (basicosModule) {
    const basicosMenu = await ensureMenu('Básicos', {
      moduleId: basicosModule.id,
      routineId: null,
      label: 'Básicos',
      shortLabel: 'BAS',
      icon: 'an an-list-bullets',
      link: null, // parent
      sortOrder: 5,
      isActive: true,
    });
    basicosMenuId = basicosMenu.id;
  }

  for (const routine of [
    settingsEstadosRoutine,
    settingsMunicipiosRoutine,
    settingsCepsRoutine,
    settingsPaisesRoutine,
  ]) {
    if (!routine) continue;
    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: basicosMenuId,
      label: routine.name,
      shortLabel: routine.shortLabel,
      icon: routine.icon,
      link: routine.path,
      sortOrder: routine.sortOrder,
      isActive: true,
    });
  }

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
    attributesRoutine,
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

  const atendimentosModule = allModules.find((item) => item.key === 'atendimentos');
  let atendimentosMenuId: number | null = null;
  if (atendimentosModule) {
    const atendimentosMenu = await ensureMenu('Atendimentos', {
      moduleId: atendimentosModule.id,
      routineId: null,
      label: 'Atendimentos',
      shortLabel: 'ATD',
      icon: 'an an-calendar-check',
      link: null, // parent
      sortOrder: 40,
      isActive: true,
    });
    atendimentosMenuId = atendimentosMenu.id;
  }

  for (const routine of [appointmentsListRoutine, appointmentsCalendarRoutine]) {
    if (!routine) continue;
    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: atendimentosMenuId,
      label: routine.name,
      shortLabel: routine.shortLabel,
      icon: routine.icon,
      link: routine.path,
      sortOrder: routine.sortOrder,
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
    settingsMenusRoutine,
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

  const usuariosModule = allModules.find((item) => item.key === 'usuarios');
  let usuarioMenuId: number | null = null;
  if (usuariosModule) {
    const usuarioMenu = await ensureMenu('Usuário', {
      moduleId: usuariosModule.id,
      routineId: null,
      label: 'Usuário',
      shortLabel: 'USR',
      icon: 'an an-user-circle',
      link: null, // parent
      sortOrder: 80,
      isActive: true,
    });
    usuarioMenuId = usuarioMenu.id;
  }

  for (const routine of [settingsProfilesRoutine, settingsUsersRoutine]) {
    if (!routine) continue;
    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: usuarioMenuId,
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

  // 3. Perfis
  const profile = await prisma.profile.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: {
      name: 'Administrador',
    },
  });

  await prisma.profile.upsert({
    where: { name: 'Analista' },
    update: {},
    create: { name: 'Analista' },
  });

  await prisma.profile.upsert({
    where: { name: 'Gerente' },
    update: {},
    create: { name: 'Gerente' },
  });

  // Vincula o perfil Administrador a todos os menus
  const allMenusForProfile = await prisma.menu.findMany();
  for (const menu of allMenusForProfile) {
    await prisma.profileMenu.upsert({
      where: {
        profileId_menuId: {
          profileId: profile.id,
          menuId: menu.id,
        },
      },
      update: { canRead: true, canWrite: true },
      create: {
        profileId: profile.id,
        menuId: menu.id,
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

  // Garante que o usuário ricardo@bjsoft.com.br (quando existir) use o perfil Administrador
  await prisma.user.updateMany({
    where: { email: 'ricardo@bjsoft.com.br' },
    data: { profileId: profile.id },
  });

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
