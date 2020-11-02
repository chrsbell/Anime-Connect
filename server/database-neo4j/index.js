const neo4j = require('neo4j-driver');
const { user, password } = require('./credentials.js');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, password));

const session = driver.session({
  database: 'anilist',
});

const close = async () => {
  await driver.close();
};

module.exports = {
  session,
  close,
};
