# Legacy Mapping — Módulo cadastros_basicos

Mapeamento de arquivos físicos e estruturas do código fonte legado (PHP/Adianti) que compõem os cadastros estruturais básicos do sistema.

---

## 📂 Arquivos de Controle (Controladores/Telas)

| Caminho do Arquivo | Tipo | Descrição |
| :--- | :---: | :--- |
| [ColaboradorForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ColaboradorForm.php) | Classe | Formulário para cadastro e edição de colaboradores/funcionários. |
| [ColaboradorList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ColaboradorList.php) | Classe | Listagem de colaboradores com filtros. |
| [EmpresaForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EmpresaForm.php) | Classe | Formulário para cadastro das empresas parceiras/clientes. |
| [EmpresaList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EmpresaList.php) | Classe | Listagem de empresas cadastradas no sistema. |
| [ProfissionalForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ProfissionalForm.php) | Classe | Formulário para cadastro dos profissionais (prestadores de serviço). |
| [ProfissionalList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ProfissionalList.php) | Classe | Listagem e filtros dos profissionais cadastrados. |
| [CidadeForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/CidadeForm.php) | Classe | Cadastro de municípios (auxiliar). |
| [CidadeList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/CidadeList.php) | Classe | Listagem de municípios cadastrados. |
| [EstadoForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EstadoForm.php) | Classe | Cadastro de unidades federativas (auxiliar). |
| [EstadoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EstadoList.php) | Classe | Listagem de unidades federativas (auxiliar). |
| [FeriadosForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/FeriadosForm.php) | Classe | Cadastro de datas festivas/feriados nacionais ou municipais. |
| [FeriadosList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/FeriadosList.php) | Classe | Listagem de datas cadastradas como feriados. |
| [FuncaoForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/FuncaoForm.php) | Classe | Cadastro de cargos/funções dos colaboradores. |
| [FuncaoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/FuncaoList.php) | Classe | Listagem e busca de cargos/funções. |

---

## 🗄️ Arquivos de Modelo (Active Record)

| Caminho do Arquivo | Tabela Banco | Descrição |
| :--- | :---: | :--- |
| [Empresa.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Empresa.php) | `empresa` | Modelo que representa as empresas. |
| [Profissional.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Profissional.php) | `profissional` | Modelo representativo dos profissionais. |
| [Colaborador.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Colaborador.php) | `colaborador` | Modelo representativo dos colaboradores. |
| [EmpresaColaborador.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/EmpresaColaborador.php) | `empresa_colaborador` | Relacionamento entre empresas e seus colaboradores. |
| [Cidade.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Cidade.php) | `cidade` | Tabela auxiliar de cidades. |
| [Estado.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Estado.php) | `estado` | Tabela auxiliar de estados. |
| [Feriado.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Feriado.php) | `feriado` | Modelo representativo de feriados cadastrados. |
| [Funcao.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Funcao.php) | `funcao` | Tabela auxiliar de cargos/funções. |
