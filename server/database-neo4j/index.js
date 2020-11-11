const neo4j = require('neo4j-driver');
const { user, password } = require('./credentials.js');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const closeDriver = async () => {
  await driver.close();
};

// add/update an anime to the database
const addAnime = async (data) => {
  let session = driver.session({
    database: 'anilist',
  });
  debugger;
  try {
    const res = await session.run(
      `MERGE (a:Anime {title : '${data.title}', rank: ${data.rank}}) RETURN a.title as title`
    );
    res.records.forEach((record) => {
      console.log(record.get('title'));
    });
    await session.close();
  } catch (err) {
    console.log(err);
    await session.close();
  }
};

// add/update user to db
const addUser = async (data) => {
  debugger;
  let session = driver.session({
    database: 'anilist',
  });
  try {
    const res = await session.run(
      `MERGE (u:User {name : $name, joined_at: $joined_at, picture: $picture}) RETURN u.name as name`,
      {
        name: data.name.toLowerCase(),
        joined_at: data.joined_at,
        picture: data.picture,
      }
    );
    res.records.forEach((record) => {
      console.log(record.get('name'));
    });
    await session.close();
  } catch (err) {
    console.error(err);
    await session.close();
  }
};

// add/update user's anime list to the database as relation
const addUserAnime = async (name, data) => {
  let session = driver.session({
    database: 'anilist',
  });
  try {
    res = await session.run(
      `
      MATCH (u:User {name: $name})
      MERGE (a:Anime {title : $title, rank: $rank}) // add/update the anime if necessary
      MERGE (u)-[r:WATCHED {user_rating: $user_rating, num_episodes_watched: $num_episodes_watched}]->(a) RETURN r`, // add/update the relationship
      {
        name: name.toLowerCase(),
        title: data.node.title,
        rank: data.node.rank,
        user_rating: data.list_status.score,
        num_episodes_watched: data.list_status.num_episodes_watched,
      }
    );
    res.records.forEach((record) => {
      console.log(record.get('r'));
    });
    await session.close();
  } catch (err) {
    console.error(err);
    await session.close();
  }
};

const findAnimeInCommon = async (name) => {
  let session = driver.session({
    database: 'anilist',
  });
  try {
    const res = await session.run(
      `MATCH p = (u:User)-[*..2]->(a:Anime)<-[*..2]-(b:User) WITH *, relationships(p) as userStats WHERE u.name=$name RETURN a.title AS anime, b.name AS friend, userStats`,
      {
        name: name.toLowerCase(),
      }
    );
    /*
      {
        username: {
          animeInCommon: 7,
          anime: [{
              name,
              myStats: {},
              friendStats: {},
          }]
        }
      }

    */
    console.table(res.records);
    let commonalities = {};
    res.records.forEach((record) => {
      let userStats = record.get('userStats');
      let friend = record.get('friend');
      let animeRecord = {
        name: record.get('anime'),
        myStats: userStats[0].properties,
        friendStats: userStats[1].properties,
      };
      if (commonalities[friend] === undefined) {
        commonalities[friend] = {
          animeInCommon: 1,
          anime: [animeRecord],
        };
      } else {
        commonalities[friend].animeInCommon += 1;
        commonalities[friend].anime.push(animeRecord);
      }
    });

    await session.close();
    // return closest connections first
    return Object.entries(commonalities).sort((a, b) => {
      return b[1].animeInCommon - a[1].animeInCommon;
    });
  } catch (err) {
    console.error(err);
    await session.close();
  }
};

module.exports = {
  closeDriver,
  addAnime,
  addUser,
  addUserAnime,
  findAnimeInCommon,
};
