# Inventário do Sistema Legado — atendimento

Mapeamento completo da superfície do sistema legado localizado na pasta `antigo/`, incluindo a estrutura de diretórios, entry points e volumetria de arquivos de código da aplicação.

---

## 📂 Árvore de Diretórios (antigo/)

Abaixo está o mapeamento dos principais diretórios e arquivos do código legado (excluindo as dependências de terceiros baixadas via Composer como `antigo/vendor/` e bibliotecas em `antigo/lib/`):

```text
antigo/
├── .htaccess                   # Regras de reescrita e configurações do servidor Apache
├── composer.json               # Gerenciador de dependências PHP
├── composer.lock               # Lock de versões das dependências
├── MadRestServer.php           # Entry point do servidor REST proprietário
├── rest.php                    # Entrada genérica para chamadas de APIs REST
├── soap.php.dist               # Modelo de entrada para comunicação via SOAP
├── mobile.php                  # Entrada para layout ou rotas móveis
├── index.php                   # Ponto de entrada web principal da aplicação
├── init.php                    # Inicializador de variáveis de ambiente e sessão
├── engine.php                  # Motor central de renderização e rotas do Adianti
├── cmd.php                     # Utilitário de CLI
├── db-mad-manager.php          # Utilitário administrativo de banco de dados
├── download.php                # Endpoint para download de arquivos de exportação
├── install.html                # Página estática de instalação da aplicação
├── install.php                 # Script PHP de instalação do banco/esquema
├── app/                        # --- Pasta de Código da Aplicação (App) ---
│   ├── config/                 # Configurações de conexão e do app (.ini e .php)
│   │   ├── application.ini     # Parâmetros gerais do app (Tema, Timezone, Debug)
│   │   ├── consultor.php       # Conexão MySQL principal ('consultor')
│   │   ├── permission.php      # Configurações de conexão para o banco de acessos
│   │   ├── communication.php   # Configurações do banco de logs/chats
│   │   └── log.php             # Configuração do log de sistema
│   ├── control/                # --- Camada de Controladores e Telas (Adianti) ---
│   │   ├── admin/              # Controle de acessos, grupos, unidades e programas
│   │   ├── builder/            # Controladores automáticos gerados pelo Madbuilder
│   │   ├── cadastros_basicos/  # Telas de cadastro básico (Cidade, Colaborador, Empresa, Profissional, etc.)
│   │   ├── communication/      # Lógica de chats, mensagens e notificações
│   │   ├── graficos/           # Relatórios gráficos
│   │   ├── install/            # Script de setup de banco
│   │   ├── log/                # Visualização de logs do sistema
│   │   ├── public/             # Telas de visualização pública (não autenticadas)
│   │   ├── relatorios/         # Filtros e templates de exportação de dados
│   │   └── servicos/           # Regras operacionais de Agendamento, Contratos e Realizados
│   ├── controller/             # Lógica adicional para rotas específicas de API
│   │   ├── ApiAuthController.php
│   │   └── SwaggerController.php
│   ├── database/               # Esquemas DDL originais (.sql) e bases locais SQLite (.db)
│   ├── model/                  # --- Camada de Modelos (Active Record) ---
│   │   ├── Agendamento.php
│   │   ├── Contrato.php
│   │   ├── Profissional.php
│   │   ├── Empresa.php
│   │   ├── Colaborador.php
│   │   └── (outros 10 arquivos correspondentes às tabelas)
│   └── routes/                 # Definição de rotas customizadas
│       └── api.php             # Rotas mapeadas para endpoints de API
├── backup/                     # Backups de dados do sistema legado
│   ├── bjsoft18_portal.sql     # Dump principal do banco de dados (476 KB)
│   └── bjsoft18_log.sql        # Dump de logs de auditoria e uso (5.8 MB)
└── telas/                      # Screenshots das telas originais para referência visual
    ├── AgendamentoCalendarioForm.png
    ├── AgendamentoCalendarioForm Incluir.png
    ├── AgendamentoList.png
    └── AgendamentoList Filtros.png
```

---

## ⚡ Pontos de Entrada (Entry Points)

| Caminho Relativo | Tipo | Finalidade |
| :--- | :--- | :--- |
| **[antigo/index.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/index.php)** | `web_entry` | Ponto de entrada padrão para a interface web no navegador. Inicializa o ambiente e renderiza as telas do Adianti. |
| **[antigo/rest.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/rest.php)** | `api_entry` | Trata as requisições direcionadas para os endpoints REST da aplicação. |
| **[antigo/mobile.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/mobile.php)** | `mobile_entry` | Trata chamadas e fluxos para telas simplificadas de dispositivos móveis. |
| **[antigo/cmd.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/cmd.php)** | `cli_entry` | Entry point para execução de tarefas em linha de comando (CLI). |
| **[antigo/engine.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/engine.php)** | `engine_entry` | Responsável pela interpretação das requisições gerais e renderização do framework Adianti. |

---

## 📊 Volumetria de Arquivos (antigo/app/)

*Apenas arquivos internos da lógica de negócios da aplicação (exclui vendor/ e lib/).*

| Extensão | Quantidade de Arquivos | Finalidade |
| :---: | :---: | :--- |
| **`.php`** | 242 | Lógica de negócios (Models, Controllers, ActiveRecords) |
| **`.css`** | 110 | Estilizações visuais |
| **`.js`** | 102 | Comportamento client-side |
| **`.html`** | 86 | Templates de layout e telas do Adianti |
| **`.sql`** | 28 | Tabelas base e DDLs de suporte |
| **`.png`/`.jpg`** | 34 | Imagens do layout e uploads |
| **`.db`** | 3 | Bancos locais SQLite em desenvolvimento |
| **Outros** | 44 | Arquivos `.json`, `.xml`, `.woff2`, etc. |
| **Total** | **649** | **Total sob a pasta `antigo/app/`** |
