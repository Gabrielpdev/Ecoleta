import knex from 'knex';
require('dotenv').config({ path: './.env' })


const connection = knex({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  },
});

export default connection;
