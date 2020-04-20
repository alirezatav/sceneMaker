const { Client } = require('pg');
const config=require('./../config')
const client = new Client({
    user: config.DATABASE_USERNAME,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
});

client.connect(err => {
    if (err) {
      console.error('PSQL connection error', err.stack)
    } else {
      console.log('PSQL connected')
    }
  })
module.exports=client;