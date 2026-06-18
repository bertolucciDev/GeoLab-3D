# Análise do Projeto GeoLab 3D

## Visão geral

O **GeoLab 3D** é uma aplicação web educacional para estudo de **Geometria Espacial**. O projeto combina uma calculadora de volumes, uma visualização 3D interativa e um fluxo guiado de aprendizagem/avaliação para ajudar o usuário a entender fórmulas, substituições numéricas e etapas de resolução.

A aplicação foi construída com **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Three.js** via `@react-three/fiber` e `@react-three/drei`. O estado principal da tela é mantido localmente no componente `App`, enquanto os dados matemáticos dos sólidos ficam centralizados em `src/data/solids/index.ts`.

## Stack e dependências principais

- **React 19**: base da interface declarativa.
- **TypeScript**: tipagem dos sólidos, inputs, resultados e etapas pedagógicas.
- **Vite**: servidor de desenvolvimento e empacotamento.
- **Tailwind CSS 4**: estilização utilitária e tema claro/escuro.
- **Three.js + React Three Fiber**: renderização 3D dos sólidos.
- **@react-three/drei**: controles de órbita e elementos HTML dentro da cena 3D.
- **lucide-react**: ícones do cabeçalho.
- **Calculadora científica interna**: ferramenta lateral para apoiar conferência de potências, raízes, trigonometria e logaritmos.
- **Zustand**: existe uma store simples criada, mas ela ainda não é usada pelo fluxo principal da aplicação.

## Estrutura de diretórios

```text
GeoLab-3D/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── app/layout/
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   ├── components/
│   │   ├── forms/DynamicForm.tsx
│   │   ├── learning/LearningPanel.tsx
│   │   ├── learning/PedagogicalGuide.tsx
│   │   ├── modes/ModeSelector.tsx
│   │   ├── results/
│   │   │   ├── MathExpression.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── StepsCard.tsx
│   │   └── tools/ScientificCalculator.tsx
│   ├── data/solids/index.ts
│   ├── scene/
│   │   ├── SceneCanvas.tsx
│   │   └── SolidRenderer.tsx
│   ├── store/useCalculatorStore.ts
│   ├── types/solid.ts
│   ├── utils/validation.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
└── eslint.config.js
```

## Fluxo principal da aplicação

O componente `App` é o centro da aplicação. Ele controla:

- sólido selecionado;
- categoria filtrada na sidebar;
- modo de uso;
- nível de dificuldade;
- tema claro/escuro;
- valores digitados no formulário;
- chave de sessão usada para reiniciar o painel de aprendizagem.

O fluxo é:

1. O usuário escolhe um sólido na `Sidebar`.
2. O `App` carrega os valores padrão dos inputs desse sólido.
3. Os valores são validados por `validateValues`.
4. O método `calculate` do sólido selecionado gera volume, fórmula, substituição, passos matemáticos e etapas de aprendizagem.
5. A cena 3D recebe os mesmos valores validados usados no cálculo.
6. Dependendo do modo, a interface mostra resultado direto, painel de aprendizagem, painel de avaliação e/ou passos matemáticos.

## Modelagem dos sólidos

A tipagem fica em `src/types/solid.ts`. O tipo mais importante é `SolidDefinition`, que descreve cada sólido com:

- `id`;
- `name`;
- `category` (`round` ou `polyhedron`);
- `kind` (`sphere`, `cylinder`, `cone`, `prism`, `pyramid`);
- `baseShape`, quando aplicável;
- `formula`;
- lista de campos de entrada;
- função `calculate`.

A função `calculate` retorna um `CalculationResult`, composto por:

- volume numérico;
- fórmula em formato textual semelhante a LaTeX;
- substituição dos valores;
- passos de resolução;
- etapas interativas de aprendizagem.

## Sólidos suportados

O projeto suporta corpos redondos e poliedros.

### Corpos redondos

- Esfera;
- Cilindro;
- Cone.

### Poliedros gerados dinamicamente

A função `polyhedra` gera prismas e pirâmides a partir de formatos de base:

- base quadrada;
- base retangular;
- triângulo equilátero;
- triângulo isósceles;
- triângulo escaleno;
- hexágono regular.

Isso cria automaticamente combinações como:

- Prisma Quadrado;
- Prisma Retangular;
- Prisma Triangular Equilátero;
- Pirâmide Quadrada;
- Pirâmide Hexagonal;
- entre outras.

## Cálculos matemáticos

Os cálculos estão concentrados em `src/data/solids/index.ts`.

O arquivo define constantes e utilitários como:

- `PI = 3.14`;
- `SQRT_3 = 1.73`;
- `EPSILON = 0.01` para tolerância de respostas;
- `fixed`, para apresentação com duas casas decimais;
- `positive`, para normalizar valores negativos/ausentes dentro das fórmulas.

As fórmulas principais são:

- esfera: `V = 4πr³ / 3`;
- cilindro: `V = πr²h`;
- cone: `V = πr²h / 3`;
- prisma: `V = Aᵦ × h`;
- pirâmide: `V = Aᵦ × h / 3`.

Para bases poligonais, a função `baseArea` calcula a área da base conforme o tipo selecionado.

## Organização pedagógica e modos de uso

A tela agora inicia com um `PedagogicalGuide`, que apresenta um roteiro em quatro momentos: observar o sólido, configurar dimensões, resolver a fórmula e verificar o resultado. Essa organização ajuda o estudante a entender que o volume não é apenas um número final, mas uma sequência entre representação visual, medidas, fórmula e validação.

A aplicação possui três modos, definidos em `ModeSelector`:

### Calculadora

Mostra o resultado rapidamente, com etapas visíveis quando os valores são válidos.

### Aprendizagem

Guia o usuário por etapas. O aluno responde perguntas, recebe feedback, pode visualizar dicas dependendo da dificuldade e libera o resultado ao concluir.

### Avaliação

Remove as dicas e funciona como uma prática avaliativa. O painel mostra métricas como erros, tentativas e percentual de acertos.

## Níveis de dificuldade

Os níveis influenciam o quanto a aplicação ajuda o usuário:

- **Fácil**: mostra fórmula, substituição e dicas.
- **Médio**: mostra a instrução inicial e exige mais participação nas próximas etapas.
- **Difícil**: exibe menos suporte, deixando o usuário resolver com base nos valores e no sólido.

## Painel de aprendizagem

`LearningPanel` controla:

- etapa ativa;
- resposta digitada/escolhida;
- tempo de sessão;
- tentativas;
- erros;
- feedback por etapa;
- exibição de dicas;
- logs de tentativas.

Cada etapa pode ser:

- resposta numérica, validada com tolerância;
- múltipla escolha, usada principalmente na seleção da fórmula.

Ao final, o painel calcula uma avaliação textual:

- `Excelente`, se não houve erros e a conclusão foi rápida;
- `Bom`, se a taxa de acerto é adequada;
- `Precisa Revisar`, caso contrário.

## Calculadora científica lateral

`ScientificCalculator` fica alocada na lateral direita do conteúdo principal em telas amplas. Ela pode ser habilitada ou desabilitada por um botão, evitando poluir a interface quando o estudante não precisa da ferramenta.

A calculadora oferece operações de apoio como:

- soma, subtração, multiplicação e divisão;
- potências;
- raiz quadrada;
- porcentagem;
- constantes `π` e `e`;
- seno, cosseno e tangente em radianos;
- logaritmo decimal e logaritmo natural.

## Visualização 3D

A renderização é dividida em dois componentes:

### `SceneCanvas`

Responsável por montar a cena:

- câmera;
- luz ambiente;
- luz direcional;
- grid auxiliar;
- controles de órbita;
- legenda HTML com raio, altura, base e nome do sólido.

### `SolidRenderer`

Responsável por escolher a geometria 3D:

- esfera: `sphereGeometry`;
- cilindro: `cylinderGeometry`;
- cone: `coneGeometry`;
- pirâmides: `coneGeometry` com quantidade de lados ajustada pela base;
- prismas: representação simplificada com `boxGeometry` escalado.

A visualização 3D tem caráter educacional e acompanha os mesmos valores usados nos cálculos, mas nem todas as bases prismáticas são representadas com geometria perfeitamente específica. Por exemplo, prismas triangulares e hexagonais são aproximados visualmente como caixas, enquanto pirâmides usam uma geometria cônica com número de segmentos variando conforme a base.

## Validação de entrada

`validateValues` percorre os campos esperados pelo sólido ativo e garante que:

- o valor foi preenchido;
- o valor é finito;
- o valor respeita o mínimo configurado.

Quando há erro, a função retorna mensagens para o formulário e também fornece `safeValues`, evitando que a cena 3D ou o cálculo quebrem com dados inválidos.

A função `isAcceptableAnswer` valida respostas do painel de aprendizagem:

- respostas textuais precisam coincidir exatamente;
- respostas numéricas aceitam vírgula decimal e usam tolerância.

## Interface e layout

A UI é composta por:

- `Header`: título, subtítulo e alternância de tema;
- `MainLayout`: grid geral com sidebar e conteúdo principal;
- `Sidebar`: filtros e seleção de sólidos;
- `PedagogicalGuide`: roteiro de estudo em quatro etapas;
- `ModeSelector`: seleção de modo e dificuldade;
- `DynamicForm`: formulário de dimensões dinâmico por sólido;
- `ResultCard`: destaque visual do volume final;
- `StepsCard`: painel matemático auditável;
- `MathExpression`: formatação simples de expressões matemáticas;
- `ScientificCalculator`: calculadora científica lateral com botão de habilitar/desabilitar.

O CSS global define:

- integração com Tailwind;
- variante `dark` baseada em classe;
- fundo radial claro/escuro;
- classe utilitária `.card` para painéis com blur, borda e sombra.

## Estado global

Existe um arquivo `src/store/useCalculatorStore.ts` com Zustand para armazenar `selectedSolid`, mas o componente `App` atualmente usa `useState` local para controlar o sólido selecionado. Isso indica uma possível evolução planejada para centralizar estado global, mas no estado atual a store não participa do fluxo principal.

## Pontos fortes

- Boa separação entre dados matemáticos, UI, validação e renderização 3D.
- Modelo de dados flexível para adicionar novos sólidos.
- Cálculo e aprendizagem compartilham a mesma fonte de verdade.
- Experiência didática com fórmulas, substituição, passos, dicas e feedback.
- Tema claro/escuro persistido em `localStorage`.
- Uso de TypeScript para garantir consistência das entidades matemáticas.

## Pontos de atenção

- A store Zustand está criada, mas não é usada.
- As expressões matemáticas são formatadas por substituições simples de string, não por um renderizador matemático completo como KaTeX ou MathJax.
- A visualização de alguns prismas é uma aproximação geométrica, não uma malha específica da base selecionada.
- Não há testes automatizados no projeto no momento.
- Algumas componentes estão compactados em linhas longas, o que pode dificultar manutenção futura.
- A constante `PI` usa `3.14`, adequado para fins pedagógicos, mas menos preciso do que `Math.PI`.

## Como executar

Instalar dependências:

```bash
pnpm install
```

Executar em desenvolvimento:

```bash
pnpm dev
```

Gerar build de produção:

```bash
pnpm build
```

Executar lint:

```bash
pnpm lint
```

## Conclusão

O GeoLab 3D é um laboratório interativo de geometria espacial voltado ao aprendizado. A aplicação não apenas calcula volumes, mas também conduz o estudante pelo raciocínio necessário para chegar ao resultado. A arquitetura atual é simples e funcional: o `App` coordena o estado, `data/solids` concentra a lógica matemática, `LearningPanel` implementa a experiência pedagógica e `SceneCanvas`/`SolidRenderer` cuidam da visualização 3D.

A base está bem preparada para evoluções como novos sólidos, melhorias nas malhas 3D, adoção real da store Zustand, testes automatizados e renderização matemática mais robusta.
