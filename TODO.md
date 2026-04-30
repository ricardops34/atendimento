# Lista de Tarefas - Sistema SaaS

## 🏁 Concluído
- [x] Configuração base do Projeto (Angular + NestJS + Prisma).
- [x] Login Customizado com visual Premium.
- [x] Base de Segurança (AuthGuard e Interceptor JWT).
- [x] Infraestrutura de API Dinâmica (Proxy Nginx para API).
- [x] Documentação de Arquitetura e Governança Unificada.
- [x] Motor de Telas Dinâmicas (Metadata-Driven).
- [x] Isolamento de Tenant no Backend.
- [x] Hierarquia de Perfis (ADMIN_SAAS, ADMIN, USER).
- [x] Layout Padronizado (Header com logo, padding e menu colapsável).
- [x] Auto-Seed de Inicialização (Tenant B.J. INFORMATICA).

## 🚀 Em Andamento
- [ ] **Módulo Admin (Gestão Master)**:
    - [ ] **Disparar Carga (Ordem Recomendada)**:
        - [ ] 1. Auxiliares (CNAE, Municípios, Países)
        - [ ] 2. Empresas
        - [ ] 3. Estabelecimentos (Filiais)
        - [ ] 4. Sócios
    - [ ] **Editor de Metadados**: Finalizar interface para áreas customizáveis (RFB e Auxiliares).
    - [ ] CRUD de Planos (Finalizar UI).
    - [ ] CRUD de Empresas (Tenants) com Lookup de Planos.
- [ ] **Sincronização RFB**:
    - [ ] Depurar erro 400 na importação massiva de CNPJ.
    - [ ] Interface de Monitoramento de Progresso.

## 📋 Próximas Etapas
- [ ] **Gestão de Acessos**:
    - [ ] CRUD de Perfis (Roles) por Tenant.
    - [ ] Interface de Permissões dinâmicas.
- [ ] **Branding e Customização**:
    - [ ] Upload de logo por Empresa (integração com S3/Local).
    - [ ] Seletor de cores dinâmico (CSS Variables).
