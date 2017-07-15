# Insurance Claims Dashboard api

## Instalation
- clone
- `npm install`
- have MongoDB instance somwhere:
  - run `mongod` locally (app will use db named `foo` by default) or
  - specify uri to MongoDB instance instance in env.MONGO_URI
- `npm start` for server or `npm run dev` for dev server with source watcher
- you may send POST request with json body  `{"user": {"login": "anyLogin", "password": "anyPassword"}}`
  to `/users/` create user with those credentials (this endpoint exists for demonstration purposes only)

## Overview
Build with `express`, uses `mongodb` for storage.

Uses `jwt` for authentication.

## TODO aka missing features
- input validation
- testing
  - unit tests, eg. for `getJWTFromHeader`
  - integration tests: maybe mock db to check side effects on api calls 
