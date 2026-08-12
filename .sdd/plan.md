# Plano de Materialização da Especificação

## Objetivo
Implementar um site educativo responsivo sobre a importância dos jogos online na aprendizagem de inglês, com conteúdos em inglês e português, imagens ilustrativas, vídeo explicativo, jogos de vocabulário e quiz final com pontuação, seguindo a estrutura e as tecnologias definidas na especificação.

## Tarefas

### Tarefa-1 — Preparação do projeto e estrutura base
- Criar a estrutura inicial do repositório e dos diretórios necessários.
- Definir os arquivos principais: index.html, styles.css, main.js e arquivos JS separados por funcionalidade.
- Verificar a organização de assets e imagens, incluindo o placeholder solicitado.
- Confirmar o caminho de publicação no GitHub Pages e garantir que os links e recursos funcionem corretamente.

### Tarefa-2 — Configuração da base visual do site
- Importar o Bootstrap no projeto.
- Definir a paleta visual, tipografia e layout base do site.
- Estruturar o tema visual com componentes padrão do Bootstrap para manter coerência e responsividade.
- Preparar a estrutura geral da página inicial com seções bem definidas.

### Tarefa-3 — Implementação do sistema de tradução automática
- Criar um header de menu padrão do bootstrap com os items das seções:
  - Games are important?
  - Educational games
  - challenge
  - Conclusion
- Criar a estrutura de tradução com objetos JavaScript para cada texto do site (lang.js).
- Marcar os elementos HTML com atributo data-i18n.
- Implementar a lógica de troca de idioma com base em PT-BR e EN-US. com toggle no header.
- Salvar a preferência do usuário no localStorage.
- Definir o idioma inicial padrão como en-US quando não houver seleção anterior.
- Garantir que o site carregue corretamente com a linguagem salva.

### Tarefa-4 — Implementação da home e seções de conteúdo
- Criar a página inicial com título principal: "The importance of online games in english learning".
- Desenvolver a Seção 1: "why are online games important?" com texto em inglês e tradução em português.
- Desenvolver a Seção 2: "Educational games" com a área do jogo da memória vazia.
- Desenvolver a Seção 3: "challenge" com a área do quiz de inglês vazia.
- Desenvolver a Seção 4: "Conclusion" com mensagem final sobre o impacto dos jogos na aprendizagem.


### Tarefa-5 — Inserção de imagens e vídeo explicativo
- Incluir banner com imagens ilustrativas de estudantes utilizando jogos educativos (placeholder com descrição alt).
- adicionar as imagens temporárias (placeholder assets/images/placeholder.png) conforme a especificação.
- Adicionar alt text claro e objetivo para todas as imagens.
- Integrar o iframe do vídeo do YouTube solicitado na seção apropriada.
- Validar responsividade do vídeo em dispositivos móveis e tablets.

### Tarefa-6 — Criação do arquivo de dados do jogo da memória (memory.json e memory.js)
- Criar o arquivo JSON com 20 pares de palavras em inglês e português.
- Definir identificadores únicos para cada par.
- Garantir que os dados sejam carregados corretamente em JavaScript.
- Desenvover a seleção aleatória de 10 pares por partida. Print os ids selecionados em console.log

### Tarefa-7 — Implementação do jogo da memória (memory.json e memory.js)
- Desenvolver o módulo JavaScript responsável pelo jogo da memória.
- Status inicial: botão para "Iniciar".
- Utilizar os 10 pares aleatórios para o início da partida.
- Embaralhar os pares e renderizar a grade 4x5 com cards ocultos.
- Exibir "X" nos cards fechados e revelar os itens ao clicar.
- Iniciar contador de tempo no segundo card revelado (3 segundos).
- Implementar lógica de comparação entre os dois cartões selecionados ao final do contador.
- Mostrar novamente o "X" quando não houver correspondência após o tempo de comparação.
- Manter os pares corretos visíveis e incrementar o contador de acertos.
- Volta ao status inicial com botão para iniciar Exibindo pontuação final ao término do jogo .
- Revisar a UX para que o jogo seja intuitivo e responsivo.

### Tarefa-8 — Criação do arquivo de dados do quiz (quiz.json e quiz.js)
- Criar o arquivo JSON com 20 perguntas em inglês.
- Cada pergunta deve conter 4 opções e uma resposta correta.
- Garantir que a resposta correta seja sempre a primeira opção.
- Estruturar o arquivo para permitir seleção aleatória de 10 perguntas por rodada.

### Tarefa-9 — Implementação do quiz de perguntas (quiz.json e quiz.js)
- Criar o módulo JavaScript responsável pelo quiz.
- Status inicial: botao para "Iniciar quiz"
- Selecionar 10 perguntas aleatórias e embaralhar a ordem.
- Renderizar cada pergunta em um fieldset separado.
- Embaralhar as opções de resposta de cada pergunta.
- Exibir radio buttons para que o usuário escolha uma alternativa por questão.
- Validar que a resposta seja selecionada antes de avançar para a próxima etapa.
- Na última etapa mostrar botão para finalizar quiz
- Ao finalizar Calcular a pontuação final e mostra status inicial com a pontuação final no formato acertos/total.

### Tarefa-10 — Responsividade e otimização para mobile
- Ajustar layout para celulares, tablets e desktops.
- Validar espaçamento, tamanhos e organização das seções em diferentes telas.
- Testar a usabilidade dos jogos em dispositivos menores.
- Ajustar componentes para manter legibilidade e navegação intuitiva.

### Tarefa-11 — Validação técnica e compatibilidade com GitHub Pages
- Verificar a compatibilidade do projeto com publicação no GitHub Pages.
- Validar a estrutura dos links e caminhos dos assets ("./").
- Confirmar que os arquivos JSON e os módulos JavaScript carregam corretamente no ambiente de produção.
- Testar a renderização do site em navegadores modernos.

### Tarefa-12 — Testes finais, correções e entrega
- Executar revisão geral do conteúdo, layout e fluxos interativos.
- Corrigir erros visuais, de lógica e de compatibilidade.
- Validar tradução, memória, quiz e pontuação final.
- Confirmar que o site atende à especificação técnica.
- Preparar a versão final para publicação e entrega.

## Conclusão
Ao final dessas tarefas, o projeto deve estar materializado como um site responsivo, educativo e funcional, com conteúdo em inglês e português, integração de Bootstrap, tradução automática, jogos educativos e quiz final com pontuação, pronto para publicação no GitHub Pages.
