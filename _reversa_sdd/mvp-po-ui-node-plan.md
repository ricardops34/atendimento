# MVP PO-UI + Node Implementation Plan

> **For implementation agents:** execute this plan task-by-task. Do not modify files under `antigo/`; use them only as read-only legacy references.

**Goal:** Build a modern MVP for the legacy scheduling routines using the existing backup data and screenshots as behavioral references.

**Architecture:** Use an Angular frontend with PO-UI for operational screens and a Node.js backend with NestJS for APIs, authentication, business rules, and data import. Persist data in PostgreSQL through Prisma ORM. The legacy PHP/Adianti system remains read-only input.

**Tech Stack:** Angular, PO-UI, TypeScript, Node.js, NestJS, PostgreSQL, Prisma, FullCalendar-compatible calendar UI, JWT/session authentication.

**Local PO-UI Docs:** Use `doc/po-ui/doc/llms-generated/` as the primary component reference during implementation.

---

## 1. Requirements & Constraints

- **REQ-001**: Implement user-authenticated access before exposing scheduling screens.
- **REQ-002**: Import and use data from `antigo/backup/bjsoft18_portal.sql`.
- **REQ-003**: Implement core entities: `tenants`, `users`, `profiles`, `modules`, `profileModules`, `companies`, `professionals`, `contracts`, `appointments`.
- **REQ-004**: Implement `AgendamentoList` equivalent: filterable list by contract, professional, and date range.
- **REQ-005**: Implement `AgendamentoCalendarioFormView` equivalent: daily, weekly, monthly, and agenda calendar views.
- **REQ-006**: Implement `AgendamentoCalendarioForm` equivalent: create, edit, delete, confirm, and generate service-order placeholder.
- **REQ-007**: Preserve observed business rules: derive `startDateTime`/`endDateTime`, calculate total duration excluding interval, set default status `A`, confirm only appointments with status `A`.
- **REQ-008**: Implement supporting registration screens for Companies, Professionals, and Contracts because they feed appointment launches.
- **SEC-001**: Enforce authenticated routes in frontend and backend.
- **SEC-002**: Enforce tenant/profile/module permissions for Calendar, Appointment List, Appointment Form, Companies, Professionals, and Contracts.
- **SEC-003**: Generate frontend menu dynamically from modules allowed for the authenticated user's active profile and tenant.
- **SEC-004**: Do not migrate or reuse the legacy `system_*` permission model.
- **CON-001**: Never modify, overwrite, or delete files under `antigo/`.
- **CON-002**: Treat legacy screenshots in `_reversa_sdd/agendamento/screenshots/` as UI reference, not pixel-perfect requirements.
- **CON-003**: Because PO-UI is Angular-based, the frontend must be Angular, not React.
- **GUD-001**: Keep MVP scoped to operational scheduling workflows; defer advanced reports and full OS document generation.
- **DOC-001**: Use local PO-UI documentation from `doc/po-ui` before consulting external docs.

## 2. Project Structure

```text
frontend/                     # Angular + PO-UI frontend (instead of apps/web)
  src/app/core/              # auth, guards, API client, layout
  src/app/features/auth/
  src/app/features/dashboard/
  src/app/features/companies/
  src/app/features/professionals/
  src/app/features/contracts/
  src/app/features/appointments/
backend/                      # NestJS backend (instead of apps/api)
  src/modules/auth/
  src/modules/tenants/
  src/modules/users/
  src/modules/profiles/
  src/modules/modules/
  src/modules/companies/
  src/modules/professionals/
  src/modules/contracts/
  src/modules/appointments/
  src/modules/import/
  prisma/
```

## 3. Data Model

### Core Tables

| New Model | Legacy Source | Purpose |
|---|---|---|
| `Tenant` | New MVP model | Customer/account isolation root |
| `User` | New MVP model; optional name/email seed from `system_users` | Login identity scoped by tenant |
| `Profile` | New MVP model | Role/profile assigned to users inside a tenant |
| `Module` | New MVP model | Menu item and permission target |
| `ProfileModule` | New MVP model | Grants module capabilities to profiles |
| `Company` | `empresa` | Customer/company cadastro |
| `Professional` | `profissional` | Professional cadastro |
| `Contract` | `contrato` | Contract cadastro linked to company |
| `ContractProfessional` | `contrato_profissional` | Link professionals to contracts |
| `ContractItem` | `contrato_item` | Optional schedule template data |
| `Appointment` | `agendamento` | Scheduling launch |

### Appointment Fields

| New Field | Legacy Field | Notes |
|---|---|---|
| `id` | `id` | Preserve legacy ID during import |
| `contractId` | `contrato_id` | Optional in legacy |
| `professionalId` | `profissional_id` | Optional in legacy |
| `description` | `descricao` | Required |
| `startDateTime` | `horario_inicial` | Required |
| `intervalStart` | `intervalo_inicial` | Optional |
| `intervalEnd` | `intervalo_final` | Optional |
| `endDateTime` | `horario_final` | Required |
| `color` | `cor` | Used by calendar event |
| `notesHtml` | `observacao` | Rich text |
| `activityStatus` | `tipo` | `A`, `R`, `C`, `F` |
| `agendaDate` | `data_agenda` | Date-only filter |
| `startTime` | `hora_inicio` | User editable |
| `endTime` | `hora_fim` | User editable |
| `intervalStartTime` | `hora_intervalo_inicial` | Default `00:00` |
| `intervalEndTime` | `hora_intervalo_final` | Default `00:00` |
| `totalTime` | `hora_total` | Calculated |
| `locationType` | `local` | `P`, `R`, `F` |

## 4. Implementation Phases

### Phase 1: Repository Scaffold

- **GOAL-001**: Create the modern MVP workspace without touching the legacy system.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-001 | Create NestJS API project in `backend/` with NestJS, TypeScript, ESLint, and test setup. | | |
| TASK-002 | Create Angular + PO-UI frontend project in `frontend/`. | | |
| TASK-003 | Add root scripts for `dev`, `build`, `test`, and `lint` targeting `backend/` and `frontend/` directories. | | |
| TASK-004 | Add `.env.example` with `DATABASE_URL`, `JWT_SECRET`, and import configuration in root and `backend/`. | | |

### Phase 2: Database and Import

- **GOAL-002**: Build a PostgreSQL schema and import data from the backup.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-005 | Create Prisma schema for tenants, users, profiles, modules, profileModules, companies, professionals, contracts, and appointments. | ✅ | 2026-06-17 |
| TASK-006 | Create migration `initial_mvp_schema`. | ✅ | 2026-06-17 |
| TASK-007 | Implement import command `backend/src/modules/import/import-legacy.command.ts`. | ✅ | 2026-06-17 |
| TASK-008 | Parse/import rows from `bjsoft18_portal.sql` for required MVP tables. | ✅ | 2026-06-17 |
| TASK-009 | Create one fallback admin user when legacy password hashes cannot be reused. | ✅ | 2026-06-17 |
| TASK-010 | Add import validation summary with record counts per table. | ✅ | 2026-06-17 |

### Phase 3: Auth, Tenant, Profile, and Dynamic Menu

- **GOAL-003**: Require user login, tenant selection, profile-based module access, and dynamic menu rendering.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-011 | Implement login endpoint `POST /auth/login` returning user, active tenant, active profile, token, and allowed modules. | ✅ | 2026-06-17 |
| TASK-012 | Implement authenticated user endpoint `GET /auth/me` returning tenant/profile context and dynamic menu modules. | ✅ | 2026-06-17 |
| TASK-013 | Implement tenant guard requiring every protected request to include an active tenant context. | ✅ | 2026-06-17 |
| TASK-014 | Implement module guard checking module keys and actions from the active profile. | ✅ | 2026-06-17 |
| TASK-015 | Seed MVP modules: `dashboard`, `companies`, `professionals`, `contracts`, `appointments-calendar`, `appointments-list`. | ✅ | 2026-06-17 |
| TASK-016 | Seed default tenant `default` and default profile `Administrador` with access to all MVP modules. | ✅ | 2026-06-17 |
| TASK-017 | Implement Angular auth guard, tenant/profile state service, and login page. | ✅ | 2026-06-17 |
| TASK-018 | Implement dynamic PO-UI menu from `GET /auth/me` allowed modules. | ✅ | 2026-06-17 |

### Phase 4: Cadastros de Apoio

- **GOAL-004**: Implement support records used by appointment launches.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-019 | Implement Company API: list, get, create, update, filtered by active tenant. | | |
| TASK-020 | Implement Professional API: list, get, create, update, filtered by active tenant. | | |
| TASK-021 | Implement Contract API: list, get, create, update, link company, filtered by active tenant. | | |
| TASK-022 | Implement PO-UI Company list/form screens. | | |
| TASK-023 | Implement PO-UI Professional list/form screens. | | |
| TASK-024 | Implement PO-UI Contract list/form screens with company and professional selectors. | | |

### Phase 5: Appointment API

- **GOAL-005**: Implement scheduling business behavior.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-025 | Implement `GET /appointments` with filters: `contractId`, `professionalId`, `dateFrom`, `dateTo`, filtered by active tenant. | | |
| TASK-026 | Implement `GET /appointments/events` for calendar range queries, filtered by active tenant. | | |
| TASK-027 | Implement `POST /appointments` with default `activityStatus = A`, `locationType = P`, and active `tenantId`. | | |
| TASK-028 | Implement `PUT /appointments/:id` with tenant ownership validation and recalculation of date-time and total duration. | | |
| TASK-029 | Implement `PATCH /appointments/:id/confirm` allowing only `activityStatus = A`. | | |
| TASK-030 | Implement `PATCH /appointments/:id/move` for calendar drag/drop updates. | | |
| TASK-031 | Implement `DELETE /appointments/:id` with tenant ownership validation. | | |

### Phase 6: PO-UI Appointment Screens

- **GOAL-006**: Recreate the four documented UI states.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-032 | Implement app shell with `po-menu`, user header, tenant/profile context, and dynamic menu items. | | |
| TASK-033 | Implement Calendar page equivalent to `AgendamentoCalendarioFormView`. | | |
| TASK-034 | Implement Appointment side panel form equivalent to `AgendamentoCalendarioForm`. | | |
| TASK-035 | Implement Appointment List page equivalent to `AgendamentoList`. | | |
| TASK-036 | Implement Appointment List filter side panel equivalent to `AgendamentoList Filtros`. | | |
| TASK-037 | Implement list export placeholder for CSV; defer XLS/PDF/XML unless required. | | |
| TASK-038 | Implement OS button as placeholder route/action until document template is migrated. | | |

### Phase 7: Verification

- **GOAL-007**: Prove MVP behavior against legacy data and flows.

| Task | Description | Completed | Date |
|---|---|---|---|
| TASK-039 | Add backend unit tests for appointment time calculation. | | |
| TASK-040 | Add backend tests for confirm-only-when-`A`. | | |
| TASK-041 | Add API tests for appointment filters. | | |
| TASK-042 | Add API tests for tenant isolation. | | |
| TASK-043 | Add API tests for module guard denial and approval. | | |
| TASK-044 | Add frontend smoke test for login and dynamic menu rendering. | | |
| TASK-045 | Add frontend smoke test for calendar event loading. | | |
| TASK-046 | Compare first imported appointment records against backup values. | | |

## 5. API Contracts

### Appointment List

```http
GET /appointments?contractId=5&professionalId=1&dateFrom=2026-06-01&dateTo=2026-06-30
```

Response:

```json
{
  "items": [
    {
      "id": 1,
      "description": "FUNLEC",
      "contractName": "FUNLEC",
      "companyName": "Example Company",
      "professionalName": "Ricardo",
      "locationType": "P",
      "agendaDate": "2022-04-04",
      "totalTime": "03:00:00"
    }
  ],
  "total": 1
}
```

### Calendar Events

```http
GET /appointments/events?start=2026-06-15&end=2026-06-21
```

Response:

```json
[
  {
    "id": 1,
    "title": "FUNLEC",
    "start": "2022-04-04T08:30:00",
    "end": "2022-04-04T11:30:00",
    "color": "#4CAF50",
    "extendedProps": {
      "contractName": "FUNLEC",
      "professionalName": "Ricardo",
      "notesHtml": "<ul>...</ul>"
    }
  }
]
```

## 6. PO-UI Screen Map

| Legacy Screen | MVP PO-UI Screen | Components |
|---|---|---|
| `AgendamentoList` | `AppointmentsListPage` | `po-page-list`, `po-table`, `po-button`, `po-dropdown`, `po-search` |
| `AgendamentoList Filtros` | `AppointmentsFilterPanelComponent` | `po-page-slide`, `po-combo`, `po-datepicker`, `po-button` |
| `AgendamentoCalendarioFormView` | `AppointmentsCalendarPage` | PO-UI shell + calendar component |
| `AgendamentoCalendarioForm Incluir` | `AppointmentFormPanelComponent` | `po-page-slide`, `po-combo`, `po-datepicker`, `po-timepicker`, `po-rich-text`, `po-button` |
| `EmpresaList/Form` | `CompaniesPage` | `po-page-list`, `po-table`, `po-modal` |
| `ProfissionalList/Form` | `ProfessionalsPage` | `po-page-list`, `po-table`, `po-modal` |
| `ContratoList/Form` | `ContractsPage` | `po-page-list`, `po-table`, `po-combo` |

## 7.1 Local PO-UI Component References

| Need | Component | Local Doc |
|---|---|---|
| Login screen | `po-page-login` | `doc/po-ui/doc/llms-generated/po-page-login.md` |
| Shell menu | `po-menu` | `doc/po-ui/doc/llms-generated/po-menu.md` |
| Menu header user block | `p-menu-header-template` | `doc/po-ui/doc/llms-generated/[p-menu-header-template].md` |
| List page | `po-page-list` | `doc/po-ui/doc/llms-generated/po-page-list.md` |
| Generic page | `po-page-default` | `doc/po-ui/doc/llms-generated/po-page-default.md` |
| Side panel | `po-page-slide` | `doc/po-ui/doc/llms-generated/po-page-slide.md` |
| Table/grid | `po-table` | `doc/po-ui/doc/llms-generated/po-table.md` |
| Table actions | `PoTableAction` | `doc/po-ui/doc/llms-generated/po-table-action.md` |
| Combo selector | `po-combo` | `doc/po-ui/doc/llms-generated/po-combo.md` |
| Date field | `po-datepicker` | `doc/po-ui/doc/llms-generated/po-datepicker.md` |
| Period field | `po-datepicker-range` | `doc/po-ui/doc/llms-generated/po-datepicker-range.md` |
| Time field | `po-timepicker` | `doc/po-ui/doc/llms-generated/po-timepicker.md` |
| Notes editor | `po-rich-text` | `doc/po-ui/doc/llms-generated/po-rich-text.md` |
| Buttons | `po-button` | `doc/po-ui/doc/llms-generated/po-button.md` |
| Search | `po-search` | `doc/po-ui/doc/llms-generated/po-search.md` |
| Dialogs | `po-dialog-service` | `doc/po-ui/doc/llms-generated/po-dialog-service.md` |
| Toasts | `po-toaster` | `doc/po-ui/doc/llms-generated/po-toaster.md` |

## 7. Alternatives

- **ALT-001**: Next.js + React. Rejected because user requested PO-UI, which is Angular-based.
- **ALT-002**: Keep PHP/Adianti. Rejected because the target is a modern Node-based backend and modernized UI.
- **ALT-003**: Angular-only with Firebase/Supabase. Rejected because business rules and import logic are clearer in a dedicated Node/NestJS backend.

## 8. Dependencies

- **DEP-001**: Node.js LTS.
- **DEP-002**: Angular CLI.
- **DEP-003**: PO-UI Angular packages.
- **DEP-004**: NestJS CLI.
- **DEP-005**: PostgreSQL.
- **DEP-006**: Prisma ORM.
- **DEP-007**: Calendar component compatible with Angular and drag/drop events.
- **DEP-008**: Rich text editor compatible with Angular for `observacao`.

## 9. Files and References

- **REF-001**: `_reversa_sdd/agendamento/screens.md`
- **REF-002**: `_reversa_sdd/ui/inventory.md`
- **REF-003**: `_reversa_sdd/ui/flow.md`
- **REF-004**: `antigo/backup/bjsoft18_portal.sql`
- **REF-005**: `antigo/app/control/servicos/AgendamentoList.php`
- **REF-006**: `antigo/app/control/servicos/AgendamentoCalendarioForm.php`
- **REF-007**: `antigo/app/control/servicos/AgendamentoCalendarioFormView.php`
- **REF-008**: `antigo/app/model/Agendamento.php`
- **REF-009**: `doc/po-ui/doc/llms-generated/po-page-slide.md`
- **REF-010**: `doc/po-ui/doc/llms-generated/po-table.md`
- **REF-011**: `doc/po-ui/doc/llms-generated/po-rich-text.md`
- **REF-012**: `doc/po-ui/doc/llms-generated/po-timepicker.md`

## 10. Testing Strategy

- **TEST-001**: Unit test total time calculation with no interval.
- **TEST-002**: Unit test total time calculation with interval.
- **TEST-003**: Unit test confirmation rejects status other than `A`.
- **TEST-004**: API test list filters by contract.
- **TEST-005**: API test list filters by professional.
- **TEST-006**: API test list filters by date range.
- **TEST-007**: API test calendar event overlap query.
- **TEST-008**: Frontend smoke test login.
- **TEST-009**: Frontend smoke test open Calendar.
- **TEST-010**: Frontend smoke test open Appointment List filter panel.

## 11. Risks & Assumptions

- **RISK-001**: Legacy password hashes may not be reusable. Mitigation: create a new admin user for MVP and import users as inactive until passwords are reset.
- **RISK-002**: SQL dump parsing can fail on large HTML content in `observacao`. Mitigation: prefer importing into a temporary MySQL database, then migrate to PostgreSQL through a controlled script.
- **RISK-003**: Calendar drag/drop behavior may differ from the legacy FullCalendar version. Mitigation: validate only functional behavior, not exact UI internals.
- **RISK-004**: PO-UI may not include a native calendar equivalent for the legacy weekly grid. Mitigation: embed a calendar component inside PO-UI shell while keeping PO-UI for layout/forms/tables.
- **ASSUMPTION-001**: MVP does not require exact PDF/OS generation in the first release.
- **ASSUMPTION-002**: MVP uses a new authorization model; legacy user names may be used only as optional seed data, never as the source of permissions.
- **ASSUMPTION-003**: The current backup contains enough seed data for a realistic MVP demo.

## 12. Done Criteria

- **DONE-001**: User can log in.
- **DONE-002**: User can access only permitted menu items.
- **DONE-003**: Companies, Professionals, and Contracts are visible from imported backup data.
- **DONE-004**: Calendar displays imported appointments by date/time and color.
- **DONE-005**: User can create a new appointment.
- **DONE-006**: User can edit, delete, and confirm an appointment.
- **DONE-007**: Appointment list filters by contract, professional, and date range.
- **DONE-008**: Automated tests pass for appointment business rules and API filters.
