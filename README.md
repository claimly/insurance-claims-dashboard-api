# Insurance Claims Dashboard api

## Instalation
- clone
- `npm install`
- have MongoDB instance somwhere:
  - run `mongod` locally (app will use db named `foo` by default) or
  - specify uri to MongoDB instance instance in env.MONGO_URI
- `npm start` for server or `npm run dev` for dev server with source watcher

## Overview
Build with `express`, uses `mongodb` for storage.

Uses `jwt` for authentication.

## TODO aka missing features
- input validation
- testing
  - unit tests, eg. for `getJWTFromHeader`
  - integration tests: maybe mock db to check side effects on api calls 
