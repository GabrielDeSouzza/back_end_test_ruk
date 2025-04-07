# 🔐 Backend - API de Autenticação com NestJS

Este projeto é uma API RESTful construída com **NestJS** e **TypeScript**, que implementa autenticação com **JWT stateless**, persistência de dados, criptografia de senhas, validação de entrada e boas práticas de status codes HTTP.

---

## 📚 Tecnologias Utilizadas

- NestJS
- TypeScript
- JWT
- Bcrypt (hash de senha)
- Class Validator
- Prisma
- ESLint
- Jest (testes unitários)

---

## ☁️ Deploy

Link do deploy 
https://back-end-test-ruk.onrender.com

## 📦 Instalação

Crie um arquivo .env com as variáveis:
```bash
DATABASE_URL=postgresql://usuario:senha@host:porta/database
JWT_KEY=seusegredoseguro
PORT=3000
```

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

npm install
```
Execute as migrações
```bash
npx prisma migrate dev
```
Inicie a aplicação:
```bash
npm run dev
```


## 📚 Endpoints

📌 Registro de Usuário - POST /auth/signUp

Body

```bash
{
  "name": "string",
  "email": "string",
  "password": "string",
  "telephones": [
    {
      "number": "number",
      "area_code": "number"
    }
  ]
}
```
Resultado

```bash
{
  "id": "uuid",
  "created_at": "2025-04-05T12:34:56.000Z",
  "modified_at": "2025-04-05T12:34:56.000Z"
}
```

## 🔑 Login de Usuário - POST /auth/signIn

Body
```bash
{
  "email": "string",
  "password": "string"
}
```
Resultado
```bash
 
 {
  "token": "jwt_token",
 }
```

## 👤 Buscar Usuário - GET /auth/profile

Header

```bash
Authorization: Bearer <token>
```
Resultado

```bash
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "telephones": [
    {
      "number": "number",
      "area_code": "number"
    }
  ],
  "created_at": "2025-04-05T12:34:56.000Z",
  "modified_at": "2025-04-05T12:34:56.000Z"
}
```

## 🔒 Segurança
Criptografia de senha com bcrypt

Autenticação stateless com JWT

Proteção de rotas privadas com guards

Validação com class-validator

## 🧪 Testes
Para executar os testes unitários:

``` bash
npm run test
```


