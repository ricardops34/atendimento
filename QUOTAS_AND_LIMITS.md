# 📊 Gestão de Quotas e Limites por Plano

Este documento define como o sistema controla o consumo de recursos por tenant, garantindo a monetização e a saúde da infraestrutura.

## 1. Limite de Usuários e Filiais (Cadastros)
Cada plano possui um número máximo de usuários e filiais permitidos.
- **Mecanismo**: Os serviços realizam um `count()` antes de permitir novas criações.

### Limites por Plano:
| Recurso | Standard | Pro | Enterprise |
| :--- | :--- | :--- | :--- |
| **Usuários** | 5 | 20 | Ilimitado |
| **Filiais** | 1 | 5 | Ilimitado |
| **Registros p/ Tabela** | 5.000 | 50.000 | Ilimitado |

## 2. Funcionalidades por Plano (Feature Toggling)
Além dos limites de volume, os planos liberam ferramentas exclusivas.

| Funcionalidade | Standard | Pro | Enterprise |
| :--- | :---: | :---: | :---: |
| **Dashboard Básico** | ✅ | ✅ | ✅ |
| **Relatórios Avançados** | ❌ | ✅ | ✅ |
| **Customização (Logo/Cores)** | ❌ | ✅ | ✅ |
| **Login Personalizado (Background)** | ❌ | ❌ | ✅ |
| **Entidades Customizadas (No-code)**| ❌ | ❌ | ✅ |
| **Audit Log Completo** | ❌ | ❌ | ✅ |

## 2. Acessos Simultâneos (Sessões)
Controla quantos dispositivos um mesmo usuário pode usar ao mesmo tempo.
- **Mecanismo**: Gerenciado via **Redis**. Cada login gera uma chave `session:user_id:tenant_id`.
- **Política**: 
  - Bloquear novo acesso se o limite for atingido.
  - Opcional: "Kick-out" (derrubar a sessão mais antiga).

## 3. Limites de Armazenamento (Database)
Para garantir a escalabilidade do banco compartilhado, os limites são baseados em **Volume de Registros** em vez de bytes físicos.
- **Standard**: Até 5.000 registros por tabela de negócio.
- **Pro**: Até 50.000 registros por tabela de negócio.
- **Enterprise**: Ilimitado (ou conforme contrato em banco dedicado).

## 4. Auditoria e Logs (Retenção)
Definido no `AuditService` via tarefa agendada (Cron).
- **Standard**: 7 dias de retenção.
- **Pro**: 30 dias de retenção.
- **Enterprise**: 365 dias de retenção.

## 5. Implementação Técnica
As quotas são injetadas no contexto da requisição através do `TenantInterceptor`, permitindo que qualquer serviço verifique os limites sem consultas extras ao banco (usando Cache em Redis).
