# Escudo Digital

O **Escudo Digital** é uma página educativa desenvolvida como projeto de extensão universitária para a disciplina **Sistemas de Informação e Sociedade**.

A aplicação apresenta dados sobre vazamentos e ataques digitais, demonstra riscos comuns para pessoas com baixo letramento digital e oferece uma autoavaliação interativa sobre hábitos de segurança. Ao final, o participante recebe uma classificação personalizada e pode enviar o resultado para um Google Forms.

## Objetivo

Ajudar pessoas a compreenderem riscos digitais de forma simples e acolhedora, sem linguagem técnica excessiva ou tom punitivo.

## Principais recursos

- Apresentação inicial sobre vazamentos e golpes digitais.
- Simulação visual de uma mensagem fraudulenta no WhatsApp.
- Gráfico de linha sobre contas vazadas e ataques semanais no mundo.
- Gráfico em formato de pizza sobre tentativas de golpe no Brasil.
- Diagnóstico de segurança com cinco perguntas.
- Resultado personalizado de 0 a 5.
- Orientações sobre os cuidados ainda ausentes.
- Formulário para nome/apelido e comentário opcional.
- Envio silencioso para Google Forms.
- Indicações de cartilhas, Instagram e vídeos educativos.
- Layout responsivo para celular e desktop.
- Animações controladas pela preferência de movimento reduzido.

## Tecnologias utilizadas

- **HTML5** — estrutura da página.
- **CSS3** — ajustes visuais e animações.
- **JavaScript** — diagnóstico, gráficos, animações e envio dos dados.
- **Tailwind CSS** — utilidades responsivas carregadas pelo CDN.
- **DaisyUI** — componentes visuais, tema, cards, modal, botões e barra de progresso.
- **SVG** — gráficos de linha e pizza.
- **Google Forms** — coleta dos resultados da autoavaliação.

## Dados apresentados

Os dados usados nos gráficos estão separados em `index.js` e contemplam:

- contas vazadas no mundo;
- ataques semanais por organização;
- tentativas de golpe no Brasil;
- contas vazadas no Brasil.

As fontes informadas no projeto são:

- Serasa Experian;
- Surfshark;
- Check Point Research.

## Estrutura do projeto

```text
Escudo-Digital/
├── index.html
├── index.js
├── charts.js
├── style.css
└── README.md
```

### Arquivos

- `index.html` — estrutura da página, conteúdo e modal do diagnóstico.
- `index.js` — dados, fluxo do quiz, animações e envio ao Google Forms.
- `charts.js` — criação dos gráficos SVG de linha e pizza.
- `style.css` — ajustes visuais, responsividade e keyframes.

## Publicação no GitHub Pages

Este projeto está preparado para ficar dentro da pasta `Escudo-Digital` no repositório:

```text
https://github.com/9Gabr/projetos-de-extensao
```

A estrutura no GitHub deve ser:

```text
projetos-de-extensao/
└── Escudo-Digital/
    ├── index.html
    ├── index.js
    ├── charts.js
    ├── style.css
    └── README.md
```

Como os arquivos são estáticos, o projeto pode ser publicado em **Settings > Pages** com:

- **Source:** Deploy from a branch.
- **Branch:** `main`.
- **Folder:** `/ (root)`.

O endereço público será:

```text
https://9gabr.github.io/projetos-de-extensao/Escudo-Digital/
```

Todos os imports locais estão em caminhos relativos, permitindo que o projeto funcione dentro da subpasta sem alterações.

## Acessibilidade

O projeto procura oferecer:

- linguagem simples;
- textos curtos;
- contraste visual;
- áreas grandes de toque;
- orientação por ícones;
- modal com barra de progresso;
- compatibilidade com `prefers-reduced-motion`.
