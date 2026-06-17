# Questões em Aberto e Lacunas — atendimento

> Gerado pelo Revisor em 2026-06-17

Este arquivo documenta as questões que exigiam esclarecimento. Para o nível de documentação **Essencial**, não foram identificadas lacunas críticas bloqueantes para a implementação do MVP do novo sistema.

---

## 🔴 Lacunas Críticas Bloqueantes
*Nenhuma lacuna crítica bloqueante foi encontrada.* Toda a regra de negócios essencial e dicionários de dados das rotinas selecionadas (`AgendamentoList`, `AgendamentoCalendarioForm`, `Contrato`, `Profissional` e `Empresa`) foram mapeados com sucesso a partir do código-fonte.

---

## 🟡 Itens de Atenção / Detalhes de Migração
Os seguintes pontos operacionais menores já possuem caminhos de resolução propostos para a codificação:

1.  **Placeholder de OS:** A geração de ordens de serviço (`OrdemServicoDocument`) está fora do escopo do MVP. Durante o desenvolvimento frontend em PO-UI, o botão correspondente será codificado como um *placeholder* visual desativado ou exibindo aviso de módulo em migração.
2.  **Cores Hexadecimais Inválidas ou Nulas no Backup:** O banco legado (`bjsoft18_portal.sql`) possui alguns contratos com cor vazia. O script de importação de dados histórico deverá tratar e aplicar uma cor cinza padrão (ex: `#333333`) para evitar erros visuais no calendário moderno.
