# Diretrizes de Desenvolvimento - Sistema SaaS

Este documento define os padrões de nomenclatura e linguagem para garantir a consistência do projeto.

## 🌍 Padrão de Idioma

Para manter o equilíbrio entre as melhores práticas de engenharia de software e a experiência do usuário final brasileiro, adotamos o seguinte padrão:

### 1. Camada Técnica (Inglês)
Toda a estrutura que não é visível ao usuário final deve ser mantida em **Inglês**. Isso inclui:
- **Banco de Dados**: Nomes de tabelas (`User`, `Tenant`, `Plan`), nomes de colunas e Enums.
- **Código Fonte**: Nomes de variáveis, funções, classes e comentários técnicos.
- **Infraestrutura**: Configurações de Docker, CI/CD e variáveis de ambiente.

*Raciocínio: Facilita a integração com bibliotecas externas e mantém o código compatível com padrões globais de desenvolvimento.*

### 2. Camada de Interface e Mensagens (Português-BR)
Tudo o que o usuário interage deve estar em **Português do Brasil**. Isso inclui:
- **Frontend (UI)**: Rótulos de campos (Labels), títulos de páginas, nomes de menus e textos informativos.
- **Notificações**: Mensagens de sucesso, alertas e erros (ex: "Empresa cadastrada com sucesso!").
- **Documentação de Negócio**: Manuais de usuário e descrições de funcionalidades.

---

## 🛠️ Exemplo de Implementação

**No Banco de Dados (Inglês):**
```prisma
model Tenant {
  id    String @id
  name  String
}
```

**No Frontend (Português):**
```typescript
const fields = [
  { property: 'name', label: 'Nome da Empresa' }
];
```

**Nas Mensagens de Erro (Português):**
```typescript
throw new UnauthorizedException('Tenant ID é obrigatório para realizar o login.');
```

---

## 🔐 Segurança
- Todas as rotas administrativas devem ser protegidas pelo `AuthGuard`.
- O Token JWT deve ser gerenciado pelo `AuthInterceptor` no frontend.
