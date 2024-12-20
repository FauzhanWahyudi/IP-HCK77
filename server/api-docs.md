# PlotAlchemy API DOCUMENTATION

## EndPoints

List of available endpoints:

- `POST /register`
- `POST /auth/google`
- `POST /login`
- `GET /genres`
- `POST /recommendation`

Routes below need authentication:

- `POST /cauldrons/:cauldronId/potions`
- `GET /cauldrons`
- `PUT /profile`

Routes below need authorization:

> the request user must be owner of the product

- `PUT /cauldrons/:cauldronId`
- `PUT /cauldrons/:cauldronId/potions/:potionId`
- `DELETE /cauldrons/:cauldronId/potions/:potionId`

## 1. POST /register

Description:

- Register a new user into the system

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "email": "string"
}
```

## 2. POST /auth/google

Description:

- Login a user into the system using Google Open Auth

Request:

- body:

```json
{
  "googleToken": "string (required)"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "<access_token>"
}
```

## 3. POST /login

Description:

- Login into the system

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "<access_token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 4. GET /genres

Description:

- show list of manga genres

Request:

_Response (200 - Success)_

```json
{
  "genres": "array"
}
```

## 5. POST /cauldrons/:cauldronId/potions

Description:

- add potions to user cauldron

Request:

- params:

```json
{
  "cauldronId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "recommendation": "string",
  "GenreId": "number"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "recommendation": "string",
  "GenreId": "number",
  "CauldronId": "number"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Cauldron not found"
}
```

## 6. GET /profile/

Description:

- get user profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "profile": "object"
}
```

## 7. PUT /profile/

Description:

- update user profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "fullName": "string",
  "profilePicture": "string"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully update profile"
}
```

## 8. GET /cauldrons

Description:

- get user cauldron

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "cauldrons": "array <cauldron>"
}
```

## 9. PUT /cauldrons/:cauldronId

Description:

- update user cauldron name

Request:

- params:

```json
{
  "cauldronId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully update cauldron"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Cauldron not found"
}
```

## 10. PUT /cauldrons/:cauldronId/potions/:potionId

Description:

- update delete user potion (recommendation) by potionId

Request:

- params:

```json
{
  "cauldronId": "number (required)",
  "potionId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "recommendation": "string",
  "GenreId": "number"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully update potion with ID: <potionId>"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error potion with ID: <id> not found"
}
- OR
{
  "message": "Cauldron not found"
}
```

## 11. DELETE /cauldrons/:cauldronId/potions/:potionId

Description:

- delete user potion (recommendation) by potionId

Request:

- params:

```json
{
  "cauldronId": "number (required)",
  "potionId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully delete potion"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error potion with ID: <id> not found"
}
- OR
{
  "message": "Cauldron not found"
}
```

## 12. POST /recommendation

Description:

- generate recommendation using Gemini AI

Request:

- body:

```json
{
  "synopsis": "string",
  "genre": "string (required)"
}
```

_Response (201 - Success)_

```json
{
  "recommendation": "string"
}
```

## Global Error Response

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You have no access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
