-- run: psql -U postgres -d postgres -f database.sql

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
