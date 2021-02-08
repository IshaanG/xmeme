-- run: psql -U postgres -d postgres -f database.sql
-- create production database
CREATE DATABASE xmeme;
-- connect to the newly created database
\c xmeme 

CREATE TABLE memes(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    caption VARCHAR NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    updated TIMESTAMPTZ NOT NULL
);
CREATE INDEX name_url_caption on memes(name, url, caption);
CREATE INDEX created_desc on memes(created desc);
-- create test database
CREATE DATABASE xmeme_test;
-- connect to the newly created database
\c xmeme_test 

CREATE TABLE memes(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    caption VARCHAR NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    updated TIMESTAMPTZ NOT NULL
);
CREATE INDEX name_url_caption on memes(name, url, caption);
CREATE INDEX created_desc on memes(created desc);