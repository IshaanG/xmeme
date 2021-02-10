require('dotenv').config();

const {
  PORT, SWAGGER_PORT, PGHOST, PGUSER, PGPASSWORD, PGPORT,
} = process.env;
let { PGDATABASE } = process.env;

if (process.env.NODE_ENV === 'test') {
  PGDATABASE = process.env.TEST_PGDATABASE;
}

module.exports = {
  PORT,
  SWAGGER_PORT,
  PGHOST,
  PGUSER,
  PGDATABASE,
  PGPASSWORD,
  PGPORT,
};
