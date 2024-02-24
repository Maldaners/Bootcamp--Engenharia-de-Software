
# PROJETO - PETSALVO - BACK-END - E - AUTOMAÇÃO

Este diretório contém o projeto de back-end da aplicação PetSalvo - Bootcamp da disciplina Software Engineering Project. 

<hr>
<br>

## Criação do projeto

```bash
# Criando o projeto
$ npx @nestjs/cli new pet-salvo-back-end

# Dependência para o banco de dados SQLite3
$ npm install @nestjs/typeorm typeorm sqlite3

# Dependências complementares
npm install class-validator 
npm install class-transformer
npm install @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
npm install @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/swagger
```

## Dependências do projeto

```bash
# Dependência para o banco de dados SQLite3
$ npm install @nestjs/typeorm typeorm sqlite3

# Dependências complementares
npm install class-validator 
npm install class-transformer
npm install @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
npm install @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/swagger
```


## Instalação

```bash
# Instalação de todas as dependências necessárias
$ npm install
```

## Execução da API

```bash
# Modo de desenvolvimento
$ npm run start

# Modo de desenvolvimento assitido
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

*A maioria dos comandos devem ser executados na pasta raiz deste projeto.

<br>
<hr>

## Documentação detalhada

A documentação completa da API do PetSalvo se encontra no [endereço local do Swagger](http://localhost:8080/swagger).

<br>
<hr>

## Persistência de dados iniciais

Na pasta "scripts_sql", encontrada na raiz deste projeto, temos o arquivo de nome "SCRIPT_PADRAO_FORMULARIO_ADOTANTE.sql". Os comandos deste <i>script</i> SQL devem ser executados para a criação do formulário padrão de adoção dos pets.
