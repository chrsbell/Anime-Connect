MATCH (n)
DETACH DELETE n

CREATE CONSTRAINT ON (a:Anime) ASSERT a.name IS UNIQUE;
CREATE CONSTRAINT ON (a:Anime) ASSERT EXISTS(a.year);
CREATE INDEX ON :Anime(year);
CREATE INDEX ON :Anime(genre);
CREATE INDEX ON :Anime(season);

CREATE CONSTRAINT