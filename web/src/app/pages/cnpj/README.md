# Documentação: Módulo de Dados Públicos CNPJ (RFB)

Este módulo foi criado para permitir a consulta e gestão dos Dados Públicos de CNPJ disponibilizados pela Receita Federal do Brasil.

## Estrutura de Arquivos
- `cnpj-empresas.ts`: Listagem de dados cadastrais das empresas (CNPJ Base).
- `cnpj-estabelecimentos.ts`: Listagem de unidades (matriz e filiais) com endereços e situação cadastral.

## O que foi feito
1.  **Criação dos Componentes**: Desenvolvidos utilizando `PoPageDynamicTable` para permitir busca, filtros e listagem otimizada.
2.  **Configuração de Rotas**: Adicionadas em `app.routes.ts` sob o path `/saas/cnpj`.
3.  **Integração com Menu**: Adicionado ao menu "Gestão SaaS Master" para o Administrador do Sistema.
4.  **Backend e Modelagem**: Criados os modelos Prisma e o serviço de importação de alto desempenho.

## Como Importar os Dados
Os dados fornecidos pela Receita Federal podem ser importados utilizando os novos endpoints de administração:

1.  **Download**: Baixe os arquivos `.zip` dos links fornecidos pela RFB.
2.  **Extração**: Extraia os arquivos `.csv` para uma pasta acessível pelo servidor backend.
3.  **Execução da Carga**:
    - `POST /cnpj/import/empresas`: { "path": "C:/dados/EMPRESAS.csv" }
    - `POST /cnpj/import/estabelecimentos`: { "path": "C:/dados/ESTABELECIMENTOS.csv" }
    - `POST /cnpj/import/auxiliary`: { "path": "C:/dados/CNAES.csv", "type": "CNAE" } (Tipos: CNAE, MUNIC, PAIS, NATU, QUAL, MOTI)

> [!TIP]
> A importação utiliza Streams e `createMany` para garantir performance e baixo consumo de memória, processando milhões de registros em blocos de 1000.

## Performance
- Garanta que as migrações do Prisma foram executadas (`npx prisma migrate dev`).
- Os índices criados em `razaoSocial`, `nomeFantasia` e `cep` são fundamentais para a fluidez da UI.

---
*Documentação gerada em 28/04/2026*
