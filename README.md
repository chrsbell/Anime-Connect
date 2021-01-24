# `Anime Connect`

## About

This is a proof-of-concept for a social networking app that helps MAL users find friends with similar tastes in anime.

![](https://i.imgur.com/cn6ZwdW.png)
![](https://i.imgur.com/7avfpYK.jpg)

## Features

- Can login and add yourself to the social network by authenticating with MAL using OAuth 2.0
- Can manually add other users to the social app
- Displays current top rated anime with a "show details" pop-up modal
- Can view anime that you have in common with other users with anime sorted by highest average rating

## Installing Dependencies

- [Neo4j is required to build the back-end](https://neo4j.com/download/)
- You should create a database with custom credentials and add the username and password as an export in `database-neo4j/credentials.js`
- The database's Bolt/HTTP settings should look like this:

```
# Bolt connector
dbms.connector.bolt.enabled=true
#dbms.connector.bolt.tls_level=DISABLED
dbms.connector.bolt.listen_address=:7687
dbms.connector.bolt.advertised_address=:7687

# HTTP Connector. There can be zero or one HTTP connectors.
dbms.connector.http.enabled=true
dbms.connector.http.listen_address=:7474
dbms.connector.http.advertised_address=:7474

# HTTPS Connector. There can be zero or one HTTPS connectors.
dbms.connector.https.enabled=false
```

- Create the schema by running the `schema.cypher` file (can copy and paste the contents into Neo4j Desktop)
- Example queries are shown in `database-neo4j/mock_data_test.cyper` to manually add users to the database
- OAuth credentials such as `client_id`, `client_secret`, should be placed as an export in `oauth/credentials.js`

Install other dependencies:

```sh
npm i
```

## Usage

- Start the server using `npm start`
- Build for development/production using `npm run react-dev` or `npm run react`

## Server API (Full API is located within `server/routes`)

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
