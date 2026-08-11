# Especificação Técnica

**Criar um site educativo com o tema: A importância dos jogos online na aprendizagem de inglês**

Contendo:
- pagina inicial com um visual atrativo
- texto em inglês e português sobre a importância dos jogos online na aprendizagem de inglês
- imagens ilustrativas
- vídeo explicativo
- jogos educativos de vocabulário: memória e quiz
- atividades de interpretação: quiz final com pontuação

# Estrutura do site
## Home
Título:The importance of online games in english learning

Banner com imagens de estudantes utilizando jogos educativos

Seção 1: why are online games important? texto em inglês. Tradução em português. Principais benefícios

Seção 2: Educational games. Memory game com 10 pares de palavras em inglês e português

Seção 3: challenge. quiz com 10 perguntas em inglês.

Seção 4: Conclusion. Mensagem como os jogos ajudam no desenvolvimento do inglês

# Tecnologias
- HTML
- CSS
- JavaScript

## arquitetura
O site deverá rodar no github pages sob o repositório importancia-dos-jogos-online, atenção aos links que devem atender a esse caminho

O site deve ser responsivo otimizar para uso em celulares e tablets

# Instruções

Importe o estilo padrão do bootstrap para o site, utilize os componentes do bootstrap para criar o site. Não precisa fugir muito do padrão do bootstrap.

Para cada feature, crie um arquivo JavaScript separado e importe para o arquivo principal. Ex: jogo da memória, quiz, tradução automática, etc.

## Tradução automática
Para a tradução automática utilize um dicionário de traduções + data-i18n

A ideia é manter as traduções em objetos JavaScript e marcar no HTML quais elementos precisam ser traduzidos.

Por exemplo:

```html
<button id="language-toggle">EN</button>

<h1 data-i18n="title"></h1>

<p data-i18n="description"></p>
```

E no JavaScript:

```javascript
const translations = {
    title: {
        "pt-BR": "Título",
        "en-US": "Title"
    },
    description: {
        "pt-BR": "Descrição",
        "en-US": "Description"
    },
};

function setLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translations[language][key];
    });

    localStorage.setItem("language", language);
}
```

o site ao carregar deve verificar o idioma salvo no localStorage e definir o idioma do site. Se não houver idioma salvo, deve definir o idioma padrão como en-US.

O toggle poderia simplesmente chamar:

setLanguage("pt-BR");

## Imagens Ilustrativas

No lugar das imagens coloque o assets/images/placeholder.png como placeholder para todas as imagens. 

Informe descrições claras e objetivas para cada imagem no atributo alt. Procurarei as imagens.

## Vídeo Explicativo

No lugar do vídeo coloque incorpore o código:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/CkFnqGHZ5tA?si=vqKrkmaCYU0wpqF7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

## Jogo da memória
Gere 20 pares de palavras em inglês e português. e salve em um arquivo JSON.

```json memory.json
[
    {
        "id": "1",
        "en": "Hello",
        "pt": "Olá"
    },
    {
        "id": "2",
        "en": "Goodbye",
        "pt": "Tchau"
    }
]
```

Para cada par gere um identificador único que será usado para identificar os pares. 

Na página, ao iniciar o jogo, selecione 10 pares aleatórios, embaralhe os pares e mostre os pares embaralhados em uma grade de 4x5 como cards e com um grande 'X' no lugar de cada par.

Ao clicar em um par, mostre o par. inicie um contador de tempo.
Ao finalizar o contador, Se o par não correspondera ao outro par selecionado, mostre novamente o 'X'

Mas se ao finalizar o contador corresponder ao outro par selecionado, deixe o par de palavras a mostra e itere um contador de acertos.

Ao finalizar o jogo, mostre a pontuação final.

## Quiz
Gere 20 perguntas em inglês com 4 opções de resposta e uma resposta correta. Salve em um arquivo JSON.

A resposta correta deve ser a primeira opção.

```json quiz.json
[
    {
        "id": "1",
        "question": "What is the capital of Brazil?",
        "options": [
            "Brasília",
            "Rio de Janeiro",
            "São Paulo",
            "Salvador"
        ]
    }
]
```

Ao iniciar o quiz, selecione 10 perguntas aleatórias, embaralhe as perguntas

Inicie um formulário com cada pergunta selecionada em um fieldset, mostre um fieldset por pergunta

para cada pergunta embaralhe as opções de resposta e mostre as opções de resposta em um formulário com radio buttons

O usuário deve selecionar uma opção para cada pergunta antes de prosseguir para a próxima pergunta

Ao finalizar todas as 10 perguntas do formulário, mostre a pontuação final no formato acertos/total. Ex: 7/10

