# Diretrizes de Desenvolvimento - Sistema SaaS

Este documento define os padrões de nomenclatura e linguagem para garantir a consistência do projeto.

## 🌍 Padrão de Idioma e Internacionalização (i18n)

Para manter o equilíbrio entre as melhores práticas de engenharia de software e a experiência do usuário global, adotamos o seguinte padrão:

### 1. Camada Técnica (Inglês)
Toda a estrutura que não é visível ao usuário final deve ser mantida em **Inglês**. Isso inclui:
- **Banco de Dados**: Nomes de tabelas (`User`, `Tenant`, `Plan`), nomes de colunas e Enums.
- **Código Fonte**: Nomes de variáveis, funções, classes e comentários técnicos.

### 2. Camada de Interface (Multi-idioma via i18n)
Toda a interface deve ser preparada para múltiplos idiomas desde o início.
- **Dicionários**: Usar arquivos JSON em `src/assets/i18n/`.
- **Idiomas Suportados**: Português-BR (Padrão), Inglês e Espanhol.
- **Regra**: Nunca escrever texto diretamente no HTML ou TS. Sempre usar chaves de tradução.

---

## 🛠️ Exemplo de Implementação i18n

**Arquivo de Tradução (pt-br.json):**
```json
{
  "login": {
    "welcome": "Boas-vindas",
    "user": "Usuário"
  }
}
```

**No HTML:**
```html
<h1>{{ literals.welcome }}</h1>
```

---

## 🔐 Segurança
- Todas as rotas administrativas devem ser protegidas pelo `authGuard`.
- O Token JWT deve ser gerenciado pelo `AuthInterceptor`.
