# Dependências do Sistema Legado — atendimento

Este documento cataloga todas as dependências e ferramentas utilizadas no sistema legado, extraídas do gerenciador de pacotes e arquivos de configuração.

---

## 🛠️ Tecnologias Principais

* **Linguagem Principal:** PHP (versão executada em servidores web legados compatível com Adianti v4.2)
* **Framework Web:** Adianti Framework 4.2 (para desenvolvimento visual, ORM, permissões e log)
* **Banco de Dados:** MySQL (driver de conexão `mysql` configurado em `app/config/consultor.php`)

---

## 📦 Dependências Composer

As dependências listadas abaixo foram extraídas do arquivo [composer.json](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/composer.json):

| Pacote | Versão Declarada | Descrição / Finalidade |
| :--- | :--- | :--- |
| **`phpmailer/phpmailer`** | `^6.9.1` | Biblioteca para envio de e-mails em PHP |
| **`picqer/php-barcode-generator`** | `^2.4.0` | Gerador de códigos de barras |
| **`dompdf/dompdf`** | `^2.0.4` | Conversor de HTML para PDF |
| **`bacon/bacon-qr-code`** | `^2.0.7` | Gerador de QR codes em PHP |
| **`firebase/php-jwt`** | `^6.10.0` | Biblioteca para autenticação com tokens JWT |
| **`linfo/linfo`** | `^4.0` | Extrator de estatísticas do sistema/hardware |
| **`adianti/plugins`** | `dev-master` | Plugins adicionais específicos do Adianti |
| **`adianti/pdfdesigner`** | `dev-master` | Utilitários de PDF do Adianti |
| **`pablodalloglio/ole`** | `dev-master` | Manipulador de estruturas OLE (leitura de planilhas antigas) |
| **`pablodalloglio/spreadsheet_excel_writer`**| `dev-master` | Exportador para o formato Excel clássico |
| **`pablodalloglio/fpdf`** | `dev-master` | Biblioteca de geração de PDFs customizados |
| **`pablodalloglio/phprtflite`** | `dev-master` | Biblioteca de geração de documentos RTF |
| **`madbuild3r/pquery`** | `dev-master` | Framework interno/utilitário para query de elementos ou REST |

---

## 🧩 Bibliotecas e Recursos Internos (lib/)

Identificados localmente na pasta [antigo/lib/](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/lib):

* **`bootstrap`**: Componentização visual e responsividade
* **`jquery`**: Manipulação do DOM e AJAX
* **`adianti`**: Componentes JavaScript/CSS proprietários do framework Adianti
* **`mad`**: Lógica associada ao gerador visual Madbuilder
* **`math`**: Recursos para cálculos
