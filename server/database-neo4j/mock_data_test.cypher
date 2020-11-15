MERGE (u:User {name: 'del', joined_at: '2017-03-28T01:11:28+00:00', picture: 'https://cdn.myanimelist.net/images/userimages/393587.jpg?t=1601167200'})
MERGE (u:User {name: 'tokufi', joined_at: '2017-03-28T01:11:28+00:00', picture: 'https://cdn.myanimelist.net/images/userimages/3973725.jpg?t=1604439000'})
MERGE (u:User {name: 'diao', joined_at: '2017-03-28T01:11:28+00:00', picture: 'https://api-cdn.myanimelist.net/images/userimages/6135186.jpg?t=1604440200'})
MERGE (u:User {name: 'xalnion', joined_at: 'Jun 27, 2013
', picture: 'https://cdn.myanimelist.net/images/userimages/2775485.jpg?t=1598990400'})
// MERGE (a:Anime {title: 'Cowboy Bebop', rank: 25})
// MATCH (u:User {name: 'diao'}) // find the user
MERGE (u)-[:LIKES]->(a)
MERGE (b:Anime {title : 'Steins;Gate', rank: 2})
MERGE (u)-[:LIKES]->(b)