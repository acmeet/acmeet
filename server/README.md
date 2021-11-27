# acmeet server

The GraphQL API for `acmeet`.

## Getting started

1. clone the repository
```
git clone https://github.com/acmeet/acmeet.git
```
2. enter the server directory
```
cd acmeet/server
```
3. install PostgreSQL
4. install dependencies
```
yarn
```
5. fill out the `.env` file, using `.env.example` as a model.
6. run containerized services
```
docker-compose up -d
```
7. initialize the database
```
yarn run db:migrate
```
8. start the server
```
yarn dev
```