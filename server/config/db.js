const Pool = require("pg").Pool;
console.log(process.env.PGPASSWORD)

const pool = new Pool(process.env.DATABASE_URL ?? {
  host: process.env.PGHOST ?? "localhost",
  database:   process.env.PGDATABASE ?? "trackor",
  user:  process.env.PGUSER ?? "postgres",
  port:  process.env.PGPORT ??  5432,
  password:  process.env.PGPASSWORD ??  "admin"
});

module.exports = pool;