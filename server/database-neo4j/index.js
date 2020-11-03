const neo4j = require('neo4j-driver');
const { user, password } = require('./credentials.js');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const session = driver.session({
  database: 'anilist',
});

const close = async () => {
  await driver.close();
};

// add an anime to the database
const addAnime = async (data) => {
  debugger;
  try {
    const res = await session.run(
      `CREATE (a:Anime {title : '${data.title}', rank: ${data.rank}}) RETURN a.title as title`
    );
    res.records.forEach((record) => {
      console.log(record.get('title'));
    });
  } catch (err) {
    console.log(err);
  }
};

// add user node to db
const addUser = async (data) => {
  try {
    const res = await session.run(
      `CREATE (u:User {name : $name, joined_at: $joined_at}) RETURN u.name as name`
    );
    res.records.forEach((record) => {
      console.log(record.get('title'));
    });
  } catch (err) {
    console.log(err);
  }
};

// add user's anime list to the database as relation
const addUserAnime = async (data) => {
  debugger;
  try {
    const res = await session.run(
      `CREATE (a:Anime {title : '${data.title}', rank: ${data.rank}}) RETURN a.title as title`
    );
    res.records.forEach((record) => {
      console.log(record.get('title'));
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  session,
  close,
  addAnime,
};
