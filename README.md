# XMeme - Meme Stream

A website to discover and share memes. Submission for Crio Winter of Doing stage 2B.
https://xmeme.ishaan.ninja

[![YouTube Demo](https://img.youtube.com/vi/DjMzYUUyWmo/0.jpg)](https://www.youtube.com/watch?v=DjMzYUUyWmo)

## Structure

- backend -> Node.js/express API
- frontend -> React frontend

## Getting Started

The provided ```install.sh``` script will install the system dependencies (tested on ubuntu 18.04). 

### Prerequisites

- PostgreSQL
- Node.js


### Installing

To setup the database run 
```
$ sudo -u postgres psql -f ./backend/db/database.sql
```
#### To run the development server

For backend,
```
$ cd backend
$ npm install
$ npm run dev
```
For frontend,
```
$ cd frontend
$ npm install
$ npm run start
```

## Running the tests

```./backend/tests``` consists of 11 integration tests.  
To run them,
```
$ cd backend
$ npm run test
```

## Deployment
A Dockerfile is also provided for easy deployment.

### Deployed URLs
- https://xmeme.ishaan.ninja
- https://api.xmeme.ishaan.ninja/memes
- https://swagger.xmeme.ishaan.ninja/swagger-ui

## Built With

* [Node.js](https://nodejs.org/en/) - Runtime to run express server.
* [Express](https://expressjs.com/) - Web app framework used
* [PostgreSQL](https://www.postgresql.org/) - Database used
* [React](https://reactjs.org/) - Front end Javascript library
