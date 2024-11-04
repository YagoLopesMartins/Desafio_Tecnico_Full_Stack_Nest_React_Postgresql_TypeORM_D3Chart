# API REST para criação de CRUD de Usuários (Backend e Frontend)

### Overview

- Sistema **CRUD** completo para gerenciamento de usuários
- Abrange tanto o **Backend** quanto o **Frontend**
- Desenvolvido em **NestJs (NodeJs)** com TYpeORM para o backend e **ReactJs** com D3chart para o frontend.
- Aplicação Web com sistema de **(Login)** com autenticação por token (**JWT**).
- Painel de CRUD de usuário e gráficos
- Conteinerização: Docker (Dockerfile, Docker Compose)
- Gráficos: D3chart
- **Tecnologias**: Nestjs, Typescript, Javascript, TypeORM (migrations, seeds), **PostgreSQL**, React (Vite, React-form-hooks, Axios, Zod, Tailwindcss, Shadcn/ui), Swagger, Passport, JWT token, 
- Tipos de usuários: Admins e Comuns.

### Objetivo

- O teste consiste na implementação de um sistema de gerenciamento de usuário com
  gráfico quantitativo de usuários ativos e cancelados separados por tipos de usuários

### Frontend

- Utilizar um framework de front-end (**React**) para construir a aplicação.
- **Telas:**

    - Apresentação (**HOME**)
      - Gráfico quantitativo de usuários ativos e cancelados separados por tipos de usuários
    - **Lista de usuários**

    - **Cadastro de usuários**

        1. **Nome** - Apenas Letras_
        2. **Sobrenome** - Apenas Letras_
        3. **E-mail** - Apenas e-mails válidos_
        4. **Senha** - Alfanuméricos de 6 dígitos
        5. **Nível de acesso** - enum (Admins e Comuns) Apenas Letras


    - **Edição de Usuário**
    - **Deletar Usuário**
    - Outras telas: **Login**

### Backend

- Desenvolver endpoints para **CRUD** (Create, Read, Update, Delete) de
  usuários.
- Criar uma **API RESTful** utilizando **Nestjs**
- Documentar com **Swagger UI**
    - Para acessar a documentação, após a execução do projeto basta acessar: http://localhost:3000/api

### Banco de Dados

- Configurar um banco de dados relacional (MySQL ou **PostgreSQL**).
- Criar tabelas necessárias para armazenar dados dos usuários.

## Configuração do Projeto

### Requisitos

- Nodejs >= 20
- Npm
- PostgreSQL
- TypeORM
- Docker
- Postman ou outro API Client for REST (Ex.: Insomnia, Thunder Client etc)

### Instalação

1. Clone o repositório ou Download ZIP:

   ```bash
   $ git clone url_projeto
   cd diretorio_projeto
   ```

2. Instale as dependências:

    - 2.1 LOCAL

        - 2.2.1 Acesso o diretório backend
          ```bash
            $ cd backend
            $ npm install ou npm i
            $ npm run build
            $ npm run start:dev
          ```
            - 2.2.1.1 Acesse o diretorio postman e import os endpoints de testes
            - 2.2.1.2 URI: `http://localhost:3000/`
            - 2.2.1.3 Insira pelo menos um usuário (POST)
        - 2.2.2 Configure o arquivo `.env`:
            - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário por exemplo: DATABASE_URL, JWT_SECRET
        - 2.2.3 Acesso o diretório frontend
          ```bash
            $ cd frontend
            $ npm install ou npm i
            $ npm run dev
          ```
            - Acese: http://localhost:5173/login (Entre com E-mail e senha cadastrados item 2.2.1.3)
            - Rotas:
              - http://localhost:5173/users/list/
              - http://localhost:5173/users/add/
              - http://localhost:5173/users/edit/
              - http://localhost:5173/home

    - EM BREVE com DOCKER

## Rotas da API

- Aqui estão as principais rotas da API
- A API estará disponível em: `http://localhost:3000`.
- Documentação com Swagger disponível em: `http://localhost:3000/api`.

### Autenticação

- **Login de usuário**

    - `POST /login`
    - Valida usuário se possui credencial de entrada ao sistema. Requer um JSON com os seguintes campos:
        - `email`: E-mail deve ser válido
        - `password`: Senha (Minimo 6 digitos e alfanúmericos)

### Usuários

- **Listar usuarios**

    - `GET /users`
    - Retorna uma lista de usuarios com paginação. Obs: 10 por página
    - Query parameters:
        - `search` (opcional): filtro por nome.
        - `page` (opcional): Número da página.
        - `limit` (opcional): Quantidade de itens por página.

- **Exibir usuário**

    - `GET /users/{id}`
    - Retorna detalhes de um usuario específico.

- **Criar usuário**

    - `POST /users`
    - Cria um novo usuário. Requer um JSON com os seguintes campos:
        - `name`: Nome do usuário (Apenas letras)
        - `email`: E-mail deve ser válido
        - `registration`: Matricula do usuário (Apenas números)
        - `password`: Senha (Minimo 6 digitos e alfanúmericos)

- **Atualizar usuário**

    - `PUT /users/{id}`
    - Atualiza um usuario existente. Aceita os mesmos campos que a criação.

- **Deletar usuário**
    - `DELETE /users/{id}`
    - Remove um usuario.

## Contribuição

Sinta-se à vontade para contribuir para este projeto enviando pull requests ou relatando problemas. Para demais pedidos e sugestões enviar e-mail para: ylm@icomp.ufam.edu.br
