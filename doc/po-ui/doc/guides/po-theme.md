# Tema Protheus / TOTVS para PO UI

Gerado automaticamente em `2026-07-07T16:20:53.281Z`.

- Pacote npm: `@totvs/po-theme`
- Versao `latest`: `21.23.0`
- Repositorio publico: https://github.com/totvs/po-theme-totvs
- Ultima atualizacao publica observada: `2026-07-06T20:14:39Z`

## Status

O repositorio publico informa que esta em processo de descontinuacao e que novas evolucoes passaram para um projeto interno/privado. Apesar disso, o pacote segue publicado no npm e pode ser usado como tema padrao TOTVS para aplicacoes com PO UI.

## Instalacao

```bash
npm i @totvs/po-theme
```

## Configuracao no `angular.json`

Adicione os estilos nesta ordem:

```json
"styles": [
  "node_modules/@totvs/po-theme/css/po-theme-default-variables.min.css",
  "node_modules/@totvs/po-theme/css/po-theme-default.min.css",
  "node_modules/@po-ui/style/css/po-theme-core.min.css"
]
```

## Observacoes

- O pacote se apresenta como `PO Theme - Totvs Default Theme`.
- O repositório publico e marcado como descontinuado; trate-o como referencia historica e snapshot tecnico.
- Para customizacoes avancadas de tema no PO UI, consulte tambem [theme-customization.md](./theme-customization.md).

## Fontes locais espelhadas

- [README do tema](../sources/po-theme-readme.md)
- [package.json do tema](../sources/po-theme-package.json)
- [Snapshot do repositorio publico](../sources/po-theme-totvs-repo/README.md)

## Metadados tecnicos do pacote

```json
{
  "name": "@totvs/po-theme",
  "description": "PO Theme - Totvs Default Theme",
  "distTags": {
    "v5-lts": "5.22.7",
    "v17-lts": "17.26.28",
    "v20-ng": "20.13.1",
    "beta": "21.17.0-beta.1",
    "latest": "21.23.0",
    "v19-lts": "19.39.17",
    "next": "21.23.0"
  },
  "latestVersion": {
    "version": "21.23.0",
    "repository": {
      "url": "git+https://github.com/totvs/po-theme-totvs.git",
      "type": "git"
    },
    "license": "MIT",
    "devDependencies": {
      "@po-ui/style": "21.23.0"
    },
    "dist": {
      "shasum": "e1413f2a9b82f47c581e19b9cccb28bb80cd5f10",
      "tarball": "https://registry.npmjs.org/@totvs/po-theme/-/po-theme-21.23.0.tgz",
      "fileCount": 26,
      "integrity": "sha512-usMgiagoQHiKdnIxv9kbYk5y4tzFbBKiTCTK0ZN6DWyO2Ez65PygLnDK+kWoyJ/3uIiCOMXwHTaSGN4g8eqEqg==",
      "signatures": [
        {
          "sig": "MEYCIQCWwHNmt2jJ3XbJ1qTvws5iz06jOsQfoTUUKNjCe/CqUQIhAOcn4TDNnqGqywgA6bM9vQHFC20NA9r0YW53mC9GHJmI",
          "keyid": "SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U"
        }
      ],
      "unpackedSize": 2366741
    }
  }
}
```

## Trecho oficial do README

```md
# ⚠️ Descontinuação do Repositório

Este repositório está em processo de descontinuação.

Esses recursos passam a ser gerenciados exclusivamente em um projeto interno (repositório privado). Portanto, não haverá mais publicação de inovações e novas funcionalidades.

Para dúvidas ou orientações sobre migração, abra uma issue neste repositório.

---

# PO Theme - Totvs Default Theme

Tema padrão da Totvs para aplicações desenvolvidas com [PO UI](http://po-ui.io).

:warning: __Uso exclusivo dos produtos TOTVS e Clientes.__

### Como usar o tema

O **PO UI** possui o seu próprio tema, mas disponibilizamos um tema com os padrões da TOTVS.

Para utilizá-lo, instale o pacote `@totvs/po-theme` conforme abaixo:

```
npm i @totvs/po-theme
```

Em seguida, atualize o arquivo `angular.json` para utilizar o tema.

```json
"styles": [
  "node_modules/@totvs/po-theme/css/po-theme-default-variables.min.css",
  "node_modules/@totvs/po-theme/css/po-theme-default.min.css",
  "node_modules/@po-ui/style/css/po-theme-core.min.css",
]
```

> Leia mais sobre [como criar seu próprio tema customizado do PO UI][create-theme-customization].

[create-theme-customization]: https://po-ui.io/guides/create-theme-customization
```