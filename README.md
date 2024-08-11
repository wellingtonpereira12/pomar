# Pomar API

Pomar API é uma aplicação desenvolvida para gerenciar árvores, espécies, grupos e colheitas de um pomar. A API foi construída utilizando Node.js, Express, e PostgreSQL.

## Requisitos

- Node.js
- npm
- PostgreSQL

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/wellingtonpereira12/pomar
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd pomar-api
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente no arquivo `.env`:
    ```plaintext
    DB_HOST=pomardb.cvkig0w8kioa.us-east-1.rds.amazonaws.com
    DB_USER=pomardb
    DB_PASSWORD=pomardb123
    DB_NAME=postgres
    DB_PORT=5432
    PORT = 3000
    ```

## Uso

### Iniciar o servidor

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start

