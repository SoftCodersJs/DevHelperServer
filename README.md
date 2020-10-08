# DevHelp

### Criado por Joneivison Oliveira, João Paulo Medeiros, Kevson Filipe e Aislânio Amorin.

## Como iniciar o Banco de dados?

1. crie um arquivo chamado ```.env``` na raiz do projeto.
2. adicone nele 
```
DATABASE_HOST= '<host do banco de dados>'
DATABASE_USERNAME='<usuário do banco de dados>'
DATABASE_PASSWORD='<senha do banco de dados>'
```
**OBS** troque os **<>** pela informação que se pede.  
Em seguida execute ```npx knex migrate:latest``` para criar as tabelas no banco  de dados.

## Como iniciar o back-end?

1. Instale o **node.js** pelo link https://node.org/  
2. Com o nodejs instalado, entre na pasta do projeto eplo seu terminal.
3. Estando na pasta do projeto aberta no terminal, execute o comando ```npm install```, em seguida  ```npm run build```, e por fim ```npm run start```.
#### Backend Rodando com sucesso!

## Modelagem de requisitos

Requisitos funcionais da aplicação

RF01
Recomendação de cursos
- Título do curso
- Categoria
- Descrição
- Autor
- Link 

RF02
Fórum (perguntas e respostas)
- Perguntas
 + Cabeçalho
 + Corpo
 + Pontuação (num.likes) 
 + Id de usuário
- Comentários
 + Corpo
 + Id de usuário
 + Id de pergunta

Usuário

Habilidades 
- Nome
- Imagem




**Ideias futuras
- perfil do usuário pode ter like?



Modelagem ER do Banco de Dados

Relacionamentos de NxN
- users <-> courses
- users <-> skills
- users <-> comments
- comments <-> skills



Tabelas: 
users
courses
skills
questions
comments

tabelas pivôs:
users_courses
users_comments
users_skills
questions_skills
comments_questions


Exemplo:
user 
nome -> joão

comentários
lorem snsnos - id_user - id_skill

tags
nome -> JS