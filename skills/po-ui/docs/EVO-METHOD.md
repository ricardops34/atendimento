# 🧠 Metodologia EVO-METHOD na Skill PO-UI

Esta skill foi desenvolvida seguindo os princípios do **EVO-METHOD**, garantindo que a inteligência artificial não apenas escreva código, mas compreenda o contexto arquitetural e as necessidades do negócio.

## 🛡️ Os 4 Pilares da Skill

1.  **Contexto Adaptativo**:
    Ao usar ferramentas como `list_components`, a IA ganha uma visão panorâmica das possibilidades antes de decidir qual componente utilizar. Isso evita o uso de componentes errados para o propósito (ex: usar um `PoSelect` quando um `PoCombo` com busca seria melhor).

2.  **Arquitetura Orientada a Sonhos (BMad Origin)**:
    Incentivamos a IA a "sonhar" a interface ideal baseada nos guias do PO-UI, em vez de se limitar ao básico. A skill fornece acesso aos guias de melhores práticas para elevar o nível da entrega.

3.  **Ciclo de Feedback Contínuo**:
    Através do acesso direto à documentação Markdown (`get_component_docs`), a IA pode validar suas próprias suposições contra a especificação oficial em tempo real.

4.  **Agentes Especializados**:
    Esta skill habilita agentes a atuarem em papéis específicos:
    - **UX Specialist**: Usa a documentação para garantir acessibilidade e padrões visuais.
    - **Frontend Architect**: Estrutura módulos Angular usando serviços e diretivas corretas.

## 🛠️ Como Contribuir seguindo o EVO-METHOD

Ao expandir esta skill, siga o fluxo:
1.  **Analyze**: Verifique se a nova ferramenta resolve uma dor real do desenvolvedor PO-UI.
2.  **Plan**: Documente a interface da ferramenta antes de codificar.
3.  **Execute**: Implemente com tipos fortes e tratamento de erros.
4.  **Verify**: Teste a ferramenta em um ambiente IA real (Cursor/Claude).

---

Referência: [EvolutionAPI/EVO-METHOD](https://github.com/EvolutionAPI/EVO-METHOD)
