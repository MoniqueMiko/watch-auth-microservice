# Watch Auth Microservice

Este projeto é um **microsserviço de autenticação** construído com [NestJS](https://nestjs.com/). Ele é responsável por gerenciar a autenticação e autorização de usuários, incluindo hashing de senhas e geração de tokens JWT. O microsserviço se comunica via **Kafka** e utiliza **TypeORM** para persistência de dados em **PostgreSQL**. O projeto é totalmente escrito em TypeScript.

---

## 📦 Tecnologias Principais

-   [NestJS v11](https://docs.nestjs.com/)
-   [KafkaJS](https://kafka.js.org/)
-   [TypeORM](https://typeorm.io/)
-   [PostgreSQL](https://www.postgresql.org/) (via `pg`)
-   [JWT](https://jwt.io/) (via `@nestjs/jwt` e `passport-jwt`)
-   [Passport](https://www.passportjs.org/) (via `@nestjs/passport`)
-   [bcrypt](https://www.npmjs.com/package/bcrypt) para hashing de senhas
-   [RxJS](https://rxjs.dev/)
-   [Jest](https://jestjs.io/) para testes
-   [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) para formatação e linting
-   [class-validator](https://github.com/typestack/class-validator) para validação
-   [class-transformer](https://github.com/typestack/class-transformer) para transformação de dados

---

## 🚀 Scripts Disponíveis

| Comando             | Descrição                                         |
| :------------------ | :------------------------------------------------ |
| `npm run start`     | Inicia a aplicação.                               |
| `npm run start:dev` | Inicia com `watch` (modo desenvolvimento).        |
| `npm run start:debug`| Inicia em modo debug.                             |
| `npm run start:prod`| Inicia em produção (compilado).                   |
| `npm run build`     | Compila o projeto (`dist/`).                      |
| `npm run format`    | Formata os arquivos com Prettier.                 |
| `npm run lint`      | Aplica ESLint nos arquivos `.ts`.                 |
| `npm run test`      | Executa os testes unitários.                      |
| `npm run test:watch`| Executa testes unitários em modo observação.      |
| `npm run test:cov`  | Executa testes com relatório de cobertura.        |
| `npm run test:debug`| Inicia testes em modo debug.                      |
| `npm run test:e2e`  | Executa testes end-to-end.                        |

---

## 🔄 Kafka

A comunicação do microsserviço é realizada via Kafka, utilizando a biblioteca `kafkajs`.

---

## 💾 Persistência de Dados

Este microsserviço utiliza **TypeORM** para interagir com uma base de dados **PostgreSQL**. As configurações de conexão com o banco de dados devem ser fornecidas através de variáveis de ambiente.

---

## 🧪 Testes

-   Testes unitários estão localizados em `*.spec.ts`.
-   Para rodar com cobertura:
    ```bash
    npm run test:cov
    ```

---

## ⚙️ Requisitos

* Node.js 18+
* Instância de Kafka rodando
* Instância de **PostgreSQL** rodando
* Variáveis de ambiente definidas no arquivo `.env`, incluindo:
    ```
    DATABASE_URL=postgres://user:password@host:port/database
    JWT_SECRET=sua_chave_secreta_jwt
    ```

---

## 🛠️ Build

Para compilar o projeto:

```bash
npm run build
```

O código será gerado na pasta `dist/`.

---

## 🧹 Lint e Prettier

Para manter o código limpo e padronizado:

```bash
npm run lint
npm run format
```

---

## 🧑‍💻 Autor
- Monique Lourenço -> monique_lourenzia@hotmail.com
---

## 📄 Licença

Este projeto é **UNLICENSED**. Uso restrito conforme especificado.

`````