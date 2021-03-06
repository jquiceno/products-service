# Products service
Basic NodeJs service to admin products, project based in express Js and mongoDb.

## Start server

Production
```
npm run start
```

Development
```
npm run dev
```
Docker compose
```
docker-compose up
```

## Env vars


| Var         | example     | # required |
|--------------|-----------|------------|
| PORT | 3000      | false       |
| ENV      | dev,production  | false       |
| MONGO_URI      | mongodb://localhost:27017/products  | true       |
| AUTH_JWT_SECRET      | sadnakjdiuasd9879  | true       |
| AUTH_JWT_EXPIRESIN      | 2d  | false       |


## Authorization
The autentication is based in Bearer token auth using JWT in request header `Authorization`

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzIiwicm9sZXMiOlsiYWRtaW4iXSwic2NvcGVzIjpbInByb2R1Y3RzLmNyZWF0ZSIsInByb2R1Y3RzLmRlbGV0ZSJdLCJpYXQiOjE2MzkzMzUwNDZ9.Q3BmoCvihZXbw07cp9I_JSyZbGpFVdm2vdG-uJFPhqs
```

### Create new auth token

```
$ npm run create-token 
```

## TODO
 
- Create unit tests using Jest
- Create integration tests using Jest an super test using Jest
- Add pagination and limits to request `/` 
- Crear filters to sort products
