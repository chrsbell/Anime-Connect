# Anime Connect

> Find friends through MAL with similar tastes in anime!

</br>

## Server API

</br>

## _OAuth 2.0 API_

</br>

### Get a MAL authentication code

- GET `/api/oauth/authenticate`

**Success Status Code:** `201`

**Returns:** JSON

````json
{
  "redirectURL": "String"
}

### Get user's OAuth status

- GET `/api/oauth/status`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "authenticated": "Boolean"
}
````

## _Anime API_

</br>

### Get a list of top rated anime (refactor with params)

- GET `/api/anime/ranking`

**Success Status Code:** `200`

**Failure Status Code:** `401`

**Returns:** JSON

```json
{
  "animeList": "Array"
}
```
