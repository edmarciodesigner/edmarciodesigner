# Edmarcio Oliveira — Portfólio

Portfólio responsivo em português, com HTML estático funcional e implementação React com TypeScript preparada para ativação pelo Vite. Identidade visual baseada em azul #67D2FE, grafite #222222 e branco #FFFFFF.

## Estado da entrega

As seções, a navegação, os filtros, as páginas de demonstração e os efeitos progressivos estão implementados. Esta etapa adiciona metadados sociais, tratamento de SEO das páginas de projeto e um componente compartilhado para carregar imagens com dimensões e variantes responsivas.

A estrutura recebida não contém package.json, lockfile, tsconfig ou configuração do Vite. A ativação React e Tailwind continua dependendo desses arquivos e da instalação das dependências. Esta entrega não os cria, não instala pacotes e não comprova uma execução do projeto.

Nenhum build, teste de navegador, medição de Core Web Vitals ou publicação foi executado nesta etapa. As verificações abaixo são trabalho futuro.

## Estrutura

- index.html: documento em pt-BR, conteúdo estático, SEO inicial, Open Graph e carregamento condicional da entrada React.
- src/routes/index.tsx: montagem React, Strict Mode e MotionConfig.
- src/pages/PortfolioPage.tsx: composição das seções e seleção de projeto por query string.
- src/pages/ProjectPage.tsx: detalhes, galeria e atualização/restauração dos metadados da rota.
- src/components/SiteLayout.tsx: navegação e rodapé compartilhados.
- src/components/ResponsiveImage.tsx: img sem wrappers adicionais, dimensões obrigatórias, srcSet/sizes opcionais, decodificação assíncrona e política de carregamento.
- src/components/Hero.tsx: fotografia principal com carregamento eager e fetchPriority high, quando existir um arquivo real.
- src/components/InstitutionalSections.tsx: sobre, serviços, colaborações e contato.
- src/components/SelectedWorks.tsx: filtros e cards com capas responsivas.
- src/data/site.ts: identidade, textos, fotografias, canais e logotipos.
- src/data/projects.ts: categorias e registros tipados de projetos.
- src/styles/global.css, brand.css e projects.css: estilos ativos, incluindo acessibilidade e responsividade.
- src/styles/tailwind.css: preparação para Tailwind CSS 4; ainda não importada.

## Ativação e comandos previstos

Antes de executar os comandos, configurar a raiz com um manifesto e lockfile, versões compatíveis de React, React DOM e Motion, além de TypeScript, Vite, @vitejs/plugin-react, @types/react, @types/react-dom, Tailwind CSS e @tailwindcss/vite.

Configurar o Vite com React e Tailwind, index.html como entrada e base conforme o caminho real de hospedagem. Configurar o TypeScript com JSX React, bibliotecas DOM, resolução compatível com bundler, modo estrito e sem emissão. Importar ../styles/tailwind.css na entrada React somente depois de instalar e configurar o plugin Tailwind. O Preflight permanece omitido para preservar a apresentação.

Os scripts a criar no manifesto são:

| Script | Comando previsto | Finalidade |
| --- | --- | --- |
| dev | vite | Servidor de desenvolvimento |
| typecheck | tsc --noEmit | Verificação dos tipos |
| build | npm run typecheck && vite build | Verificação e geração de dist |
| preview | vite preview | Revisão local do build |

Após essa configuração, executar nesta ordem:

```sh
npm install
npm run typecheck
npm run build
npm run preview
```

Usar npm run dev para desenvolvimento. Depois que houver um lockfile válido, usar npm ci nas instalações reproduzíveis de CI. Esses comandos são instruções futuras; não foram executados nesta entrega.

Sem build, o index.html mantém a versão estática. O TypeScript não é executado diretamente pelo navegador. A montagem React depende das variáveis substituídas pelo Vite; se o módulo não carregar, o conteúdo HTML permanece disponível.

## SEO e compartilhamento

O head inicial define idioma pt-BR, título com designer gráfico em Itaboraí, descrição natural dos serviços, theme-color, og:locale, og:type, og:site_name, título e descrição Open Graph. As tags Twitter usam summary, sem anunciar uma imagem inexistente.

As páginas React atualizam título, descrição, Open Graph e Twitter a partir dos dados do projeto e restauram os valores anteriores ao desmontar. Projetos com kind: 'project' recebem index, follow; placeholders e slugs desconhecidos recebem noindex, follow. O detalhe estático também marca as demonstrações e endereços desconhecidos como noindex, follow após executar JavaScript. Isso não substitui respostas HTTP ou renderização no servidor.

A URL final deste novo portfólio não está confirmada. O domínio usado como contato existente não foi assumido como destino de publicação. Por isso, canonical, og:url, og:image e twitter:image permanecem ausentes.

Quando o destino for confirmado, configurar canonical e og:url absolutos e específicos para a home e cada projeto publicado. Não apontar todos os projetos para a home. Adicionar og:image, suas dimensões, og:image:alt e os equivalentes Twitter somente após disponibilizar uma imagem social aprovada e pública; então avaliar summary_large_image.

A home já contém metadados no HTML inicial. Os metadados individuais de projetos dependem de JavaScript. Para compartilhamento específico e SEO completo de projetos reais, prever prerenderização ou SSR que entregue conteúdo e head próprios por endereço. Crawlers sociais podem não executar JavaScript. A hospedagem também deverá tratar projetos inexistentes com status 404; a interface atual não altera o status HTTP.

## Fotografias e imagens locais

Nenhum arquivo original de fotografia, logo ou imagem social foi fornecido nesta etapa. Não foram criadas pessoas substitutas, URLs temporárias ou referências ativas a arquivos inexistentes.

Após receber e validar os originais, disponibilizar arquivos locais permanentes no mecanismo de assets da hospedagem. Em uma futura configuração Vite, public/assets/images e public/assets/projects podem servir esse propósito; essas pastas e seus binários não foram criados nesta entrega. Se houver hospedagem em subdiretório, ajustar os caminhos à base efetiva antes de cadastrar os assets.

Preparar WebP ou AVIF com qualidade visual revisada. Preservar transparência no recorte da hero, identidade facial e proporção das variantes. Remover metadados privados da cópia destinada à web. Evitar aumentar artificialmente uma imagem pequena.

Para a fotografia principal, preencher site.assets.portrait.src, alt, width e height com o caminho e as dimensões reais. Hero usa ResponsiveImage com priority, que aplica loading eager e fetchPriority high. A área visual existente permanece reservada pelo CSS. Ao ativar a foto, remover também hero-canvas-pending no HTML estático e substituir seu placeholder por um img com os mesmos atributos, preservando os containers e as camadas.

Para uma fotografia adicional validada, preencher site.assets.aboutPortrait e sincronizar a seção estática. Imagens de sobre, logotipos, cards e galeria usam carregamento lazy e decoding async. As dimensões intrínsecas reservam a proporção; os cards mantêm seu aspect-ratio e recorte atuais. Não definir priority em imagens abaixo da primeira dobra.

O componente ResponsiveImage aceita srcSet e sizes nativos. Cadastrar somente variantes que existam, com o mesmo recorte e proporção, usando descritores como 640w, 960w e 1600w. Os valores são larguras reais em pixels. Preferir dimensões adequadas à largura de exibição e à densidade do dispositivo, sem enviar o arquivo original de alta resolução indiscriminadamente.

ProjectImage oferece srcSet e sizes opcionais. Os cards e a galeria já fornecem sizes padrão; deixar sizes ausente permite que cada contexto escolha seu valor. Não é necessário inventar variantes para usar uma imagem única.

## Fontes

Nebulica, Helvena e Brinnan foram identificadas como referências, mas arquivos e licenças web não foram fornecidos. As alternativas de sistema e os tokens --brand-font e --brand-display em brand.css permanecem ativos; não há downloads externos de fontes ou requisições para arquivos ausentes.

Após confirmar a licença, preparar arquivos locais WOFF2 apenas para os pesos realmente usados, incluindo os caracteres do português. Declarar @font-face em brand.css com os nomes corretos, peso e estilo correspondentes e font-display: swap; atualizar os tokens existentes sem trocar a hierarquia tipográfica. Em uma configuração Vite futura, os arquivos podem ficar em public/assets/fonts, respeitando a base de hospedagem.

Só adicionar preload após existir um arquivo crítico real e confirmar seu uso, com as="font", type="font/woff2" e crossorigin. Revisar quebras, largura dos títulos e deslocamentos de layout quando a fonte carregar, pois suas métricas podem diferir das alternativas atuais.

## Cadastro de projetos

Adicionar em src/data/projects.ts um registro novo com slug único, kind: 'project', title, category, description e images. O endereço é gerado como ?projeto= seguido do slug codificado. A primeira imagem é a capa; a galeria utiliza todas as imagens na ordem cadastrada.

Cada imagem deve informar src, alt, width e height. Pode informar caption, srcSet e sizes. O texto alternativo descreve o conteúdo relevante sem repetir palavras-chave artificialmente. Campos client, challenge, concept, applications, results e year são opcionais: preencher somente com informações reais autorizadas.

As categorias válidas estão em projectCategories. Os dois registros com kind: 'placeholder' continuam demonstrações explícitas. Não alterar seu tipo para apresentá-los como trabalhos de clientes. Criar um registro separado para cada trabalho real.

A versão sem build tem cards e detalhes demonstrativos próprios no index.html. Dados TypeScript não atualizam esse HTML automaticamente. Até existir geração estática ou prerenderização, sincronizar os conteúdos correspondentes ao cadastrar projetos reais e adaptar a lógica estática de metadados e robots, que atualmente reconhece somente demonstrações. Verificar também que a mensagem de placeholders não permaneça após cadastrar trabalhos reais.

## Contatos e colaborações

Em site.contact.channels, preencher href somente com destinos confirmados: URL real do WhatsApp, URL real do Instagram ou mailto: com o e-mail profissional. Manter null quando o canal não estiver disponível.

O primeiro canal configurado é usado pelo botão principal; na ausência de canais, o destino continua sendo site.contact.href, atualmente o site existente. Alterar sua ordem altera a prioridade do botão. Sincronizar links e estados informativos no index.html enquanto a versão estática existir.

Para marcas e colaborações, preencher site.collaborations.logos com id, name, src, alt, width e height reais. A apresentação monocromática e o espaçamento existentes são preservados. Não cadastrar empresas sem autorização.

## Verificações futuras da entrega

- Executar typecheck e build após configurar as dependências; revisar o resultado servido por preview, sem erros de console ou requisições 404 de assets.
- Conferir home, cada categoria, filtro vazio, reset, detalhes, slug inválido e links de retorno à galeria. Testar tanto a versão estática quanto a versão React.
- Navegar com Tab, Shift+Tab, Enter e Escape; verificar skip link, foco visível, menu mobile, fechamento externo e redimensionamento para desktop.
- Revisar larguras de 320, 375, 640, 760, 959, 960 e 1440 pixels, além de zoom de 200%, orientação horizontal e textos longos. Confirmar ausência de cortes, rolagem horizontal e sobreposições indevidas.
- Conferir contraste WCAG AA, placeholders, hover, foco e filtros ativos/desabilitados. Esta etapa preserva os estilos e breakpoints anteriores.
- Testar prefers-reduced-motion, teclado, dispositivo touch e mouse; garantir conteúdo disponível quando animações ou imagens falharem.
- Simular rede lenta e cache vazio. Confirmar prioridade da hero, carregamento lazy abaixo da dobra, dimensões reservadas e escolha de currentSrc quando houver srcSet.
- Após receber os assets, medir LCP, CLS e INP e revisar compressão, peso das fontes e requisições. Nenhum resultado de performance foi medido nesta entrega.
- Inspecionar título, descrição, idioma e metadados por endereço; verificar a restauração dos metadados React, noindex dos placeholders e ausência de canonical ou imagem social fictícios.
- Após definir domínio, imagem social e prerenderização, validar o HTML inicial e a prévia de compartilhamento de cada projeto publicado. Confirmar status HTTP dos endereços inválidos e configuração da base na hospedagem.

## Publicação e integrações

A publicação não foi configurada ou executada. Após ativar e validar o Vite, a pasta de saída prevista é dist; conferir a configuração real antes de conectar a hospedagem. GitHub, Vercel, Lovable e Supabase não receberam novas integrações nesta etapa.

Sem backend, autenticação ou painel administrativo. Permanecem pendentes os materiais originais, licenças web, contatos confirmados, endereço final de publicação e imagem social aprovada.
