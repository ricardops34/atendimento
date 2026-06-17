# Cadastros de Apoio, Design Técnico

## Interface

Esta unit é composta pelas seguintes interfaces do sistema legado:

### Modelos ActiveRecord (Persistência)

| Símbolo | Classe Base | Tabela Associada | Observação |
|---------|-------------|------------------|------------|
| `Empresa` | `TRecord` | `empresa` | Representa a empresa cliente. |
| `Profissional` | `TRecord` | `profissional` | Representa o profissional executor. |
| `Contrato` | `TRecord` | `contrato` | Representa o contrato, herdando `empresa_id`. |
| `ContratoItem` | `TRecord` | `contrato_item` | Representa a escala semanal do profissional vinculada ao contrato. |

### Controladores e Telas

| Símbolo | Método / Ação | Retorno / Saída | Observação |
|---------|---------------|-----------------|------------|
| `EmpresaForm.onSave` | `onSave($param)` | Salva registro no banco | Valida preenchimento de `nome`. |
| `ProfissionalForm.onSave` | `onSave($param)` | Salva registro no banco | Valida preenchimento de `nome`. |
| `ContratoForm.onSave` | `onSave($param)` | Salva registro no banco | Valida preenchimento de `descricao` e `empresa_id`. |
| `ContratoForm.OnChangeEmpresa` | `OnChangeEmpresa($param)` | Ajax / Preenche campos | Preenche dados adicionais caso necessário. |

---

## Fluxo Principal (Cadastro e Persistência)

1.  **Abertura de Transação:** O controlador do formulário abre uma transação com o banco de dados `consultor` (`TTransaction::open('consultor')`).
2.  **Validação de Formulário:** Dispara a validação dos campos obrigatórios declarados no construtor (`$this->form->validate()`).
3.  **Mapeamento de Dados:** Os dados enviados na requisição HTTP são extraídos e carregados para a respectiva instância ActiveRecord usando o método `$object->fromArray((array) $data)`.
4.  **Gravação Física:** O método `$object->store()` é acionado para persistir os dados no banco.
5.  **Confirmação Visual:** A transação é fechada com sucesso (`TTransaction::close()`) e um aviso visual é emitido para o usuário.

---

## Fluxos Alternativos e Tratamento de Erros

*   **Validação Falha:** Se algum campo obrigatório (ex: `nome` da empresa) estiver em branco, a execução lança uma exceção `ValidationException`, revertendo qualquer operação pendente no banco e mantendo os dados digitados na tela (`$this->form->setData($this->form->getData())`).
*   **Erro de Banco (Unique Constraints / FK):** Em caso de falha de banco de dados (como tentativa de exclusão de uma empresa que possui contratos associados), a exceção é capturada, a transação sofre rollback (`TTransaction::rollback()`) e uma caixa de mensagem de erro (`TMessage`) é renderizada para o usuário.

---

## Dependências

*   **Banco de Dados (MySQL/SQLite):** Conexão configurada em `app/config/consultor.php` (ou SQLite local em `.db`).
*   **Adianti Framework Library:** Depende das classes centrais do framework como `TRecord`, `TPage`, `TForm` e `TTransaction`.

---

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| **Uso de Cores Hexadecimais em Contratos:** O contrato armazena a cor Hex como string simples (`cor`), sem validação de formato Regex no backend, confiando apenas no seletor de cores visual (`TColor`) do cliente. | [AgendamentoCalendarioForm.php:40](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L40) | 🟢 |
| **Padrão Active Record (TRecord):** O mapeamento objeto-relacional é feito estendendo a classe `TRecord` do Adianti, herdando a política de ID autoincremento (`serial`). | [Contrato.php:3](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Contrato.php#L3) | 🟢 |

---

## Estado Interno (Tabelas de Banco)

### Tabela: `empresa`
*   `id`: `INTEGER` (Chave Primária, Autoincremento)
*   `nome`: `VARCHAR` (Obrigatório)

### Tabela: `profissional`
*   `id`: `INTEGER` (Chave Primária, Autoincremento)
*   `nome`: `VARCHAR` (Obrigatório)

### Tabela: `contrato`
*   `id`: `INTEGER` (Chave Primária, Autoincremento)
*   `empresa_id`: `INTEGER` (FK para `empresa.id`, Obrigatório)
*   `descricao`: `VARCHAR` (Obrigatório)
*   `cor`: `VARCHAR` (Hexadecimal, Opcional)

---

## Observabilidade

*   **Logs de Transação:** Toda operação de persistência via Active Record registra logs de queries SQL caso o logger esteja habilitado (`TTransaction::setLogger`).
*   **Histórico de Logs de Auditoria:** O sistema grava alterações e acessos na tabela de logs (encontrado em `backup/bjsoft18_log.sql`).

---

## Riscos e Lacunas

*   🔴 **Validação de Formato de Cor Hex:** O código legado não possui validação rígida de formato de cor no backend. Se uma string inválida for gravada diretamente no banco de dados, pode quebrar a renderização visual do calendário no frontend. A nova stack deverá sanitizar e validar o formato hex (`/^#[0-9A-F]{6}$/i`).
