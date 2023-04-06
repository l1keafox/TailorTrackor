// const Pool = require("pg").Pool;
// console.log(process.env.PGPASSWORD)

// const pool = new Pool({
//   host: process.env.PGHOST ?? "localhost",
//   database:   process.env.PGDATABASE ?? "trackor",
//   user:  process.env.PGUSER ?? "postgres",
//   port:  process.env.PGPORT ??  5432,
//   password:  process.env.PGPASSWORD ??  "admin"
// });

const { Client } = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const result = async ()=>{ await pool.connect() }
result();
console.log('Connecitng to db',process.env.DATABASE_URL,result);

module.exports = pool;