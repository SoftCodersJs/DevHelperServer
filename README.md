# DevHelp

### Criado por Joneivison Oliveira, João Paulo Medeiros, Kaio Felipe e Aislânio Amorin.

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