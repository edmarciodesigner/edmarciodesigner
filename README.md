# Edmarcio Oliveira — Landing page

Base responsiva em português, com HTML estático funcional e uma implementação React com TypeScript preparada para migração gradual.

## Estado desta etapa

O `index.html` continua funcionando diretamente no navegador, sem instalação ou build. A implementação React preserva os textos, as seções, as classes e os destinos de contato existentes.

A migração ainda depende da configuração das ferramentas na raiz. Esta entrega não cria `package.json`, `tsconfig.json` ou arquivos de configuração do Vite, porque novos arquivos nesses caminhos não estão autorizados nesta etapa. Nenhuma instalação ou execução de build foi realizada.

## Estrutura preparada

- `index.html`: documento semântico, conteúdo estático de segurança e carregamento condicional da entrada React em ambiente Vite.
- `src/routes/index.tsx`: função de montagem React, Strict Mode e configuração de movimento reduzido para Motion.
- `src/pages/PortfolioPage.tsx`: composição da página e renderização das seções existentes.
- `src/components/SiteLayout.tsx`: navegação, atalho de acessibilidade e rodapé reutilizáveis.
- `src/data/site.ts`: navegação, contato, serviços, demonstrações de portfólio e processo em dados estruturados.
- `src/styles/global.css`: estilos existentes extraídos do HTML, preservando classes e pontos de quebra.
- `src/styles/tailwind.css`: folha preparada para Tailwind CSS 4, ainda sem importação ativa.

## Plano explícito de ativação

Quando a configuração de novos arquivos na raiz estiver autorizada:

1. Criar um manifesto de pacote com `react`, `react-dom` e `motion`, além das dependências de desenvolvimento `typescript`, `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `tailwindcss` e `@tailwindcss/vite`.
2. Configurar o Vite com os plugins React e Tailwind, mantendo `index.html` como entrada e definindo `base` conforme o destino de hospedagem.
3. Configurar o TypeScript para JSX React, resolução de módulos compatível com o bundler, bibliotecas DOM, verificação estrita e execução sem emissão.
4. Adicionar os comandos `dev`, `build`, `preview` e `typecheck`. O build deve verificar os tipos antes de gerar os arquivos estáticos.
5. Importar `../styles/tailwind.css` na entrada React após configurar o plugin Tailwind. A folha omite o Preflight para preservar a apresentação atual durante a migração.
6. Instalar os pacotes, executar a verificação de tipos e o build, e revisar a página em desktop e mobile, incluindo teclado e preferência de movimento reduzido.

O carregamento React é condicionado às variáveis de ambiente substituídas pelo Vite. Abrir o HTML diretamente ou hospedá-lo sem build mantém o conteúdo estático; não tenta executar TypeScript no navegador. Se o módulo React não carregar, o conteúdo estático permanece disponível.

## Personalização

- Cores: variáveis CSS `--bg`, `--ink` e `--accent` em `src/styles/global.css`.
- Conteúdo React: textos em `src/pages/PortfolioPage.tsx` e dados em `src/data/site.ts`.
- Conteúdo estático: manter os textos correspondentes do `index.html` sincronizados enquanto existir a versão de segurança.
- Portfólio: substituir os dois exemplos explicitamente marcados como demonstração por trabalhos reais e suas imagens.
- Contato: o destino existente é https://edmarciodesigner.com.br/. Nenhum telefone, e-mail ou perfil social foi inventado.
- SEO: título e meta description permanecem no `index.html`.

## Publicação

A versão estática permanece compatível com hospedagem simples. Após ativar o Vite, publicar a pasta gerada pelo build conforme a plataforma escolhida. A publicação não foi configurada nesta entrega.

Sem backend, autenticação, formulário ou novas integrações externas. Nenhum cliente, resultado ou depoimento foi inventado. A nova direção visual, as fotografias e as demais seções ficam para suas etapas específicas.
