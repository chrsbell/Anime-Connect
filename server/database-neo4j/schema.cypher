MATCH (a)
REMOVE a:
DETACH DELETE a;

// DROP CONSTRAINT ON (a:Anime) ASSERT a.Name IS UNIQUE;
// DROP CONSTRAINT ON (a:Anime) ASSERT EXISTS(a.rank);
// DROP CONSTRAINT ON (u:User) ASSERT u.username IS UNIQUE;
// DROP CONSTRAINT ON (u:User) ASSERT EXISTS(u.joined_at);

CREATE CONSTRAINT IF NOT EXISTS ON (a:Anime) ASSERT a.mal_id IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (a:Anime) ASSERT EXISTS(a.mal_id);
CREATE CONSTRAINT IF NOT EXISTS ON (a:Anime) ASSERT EXISTS(a.title);
CREATE CONSTRAINT IF NOT EXISTS ON (a:Anime) ASSERT EXISTS(a.rank);
CREATE CONSTRAINT IF NOT EXISTS ON (u:User) ASSERT u.name IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (u:User) ASSERT EXISTS(u.joined_at);

CREATE INDEX ON :Anime(rank);
// CREATE INDEX ON :User(username);
