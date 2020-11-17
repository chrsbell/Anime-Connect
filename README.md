# Anime Connect

> Find friends through MAL with similar tastes in anime!

</br>

## Server API

</br>

## _OAuth 2.0 API_

</br>

### Gets an authentication code from MAL and returns a URL the current user can use to obtain an access token

- GET `/api/oauth/authenticate`

**Success Status Code:** `201`

**Returns:** JSON

````json
{
  "redirectURL": "String"
}

### Gets the current user's authenication status

- GET `/api/oauth/status`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "authenticated": "Boolean"
}
````

## _Anime API_

```
Anime {
  mal_id: int
  title: string
  rank: int
  genre: string
  start_season: string
  main_picture: {
    medium: string,
    large: string,
  }
}
```

</br>

### Gets a list of top-rated anime

- GET `/api/anime/ranking`

**Success Status Code:** `200`

**Failure Status Code:** `401`

**Returns:** JSON

```json
{
  "animeList": "Array[Anime]"
}
```
