# 📊 Gestão de Quotas e Limites por Plano

Este documento define como o sistema controla o consumo de recursos por tenant, garantindo a monetização e a saúde da infraestrutura.

## 1. Limite de Usuários (Cadastros)
Cada plano possui um número máximo de usuários ativos permitidos.
- **Mecanismo**: O `UsersService` realiza um `count()` antes de permitir novas criações.
- **Feedback**: Retorno de erro `403 Forbidden` com mensagem de "Limite de plano atingido".

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
