const pool = require("../config/db.js");
const userSeeds = require("./userSeeds.json");
const bcrypt = require("bcrypt");

console.log(userSeeds);
async function doStuff(){

	await pool.query("DROP TABLE users");
	await pool.query('CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(255),  password VARCHAR(255));')
	userSeeds.forEach(async (entry) =>{
		const saltRounds = 10;
		const password = await bcrypt.hash(entry.password, saltRounds);		
		await pool.query(
			"INSERT INTO users (username,password) VALUES($1,$2)",
			[entry.username, password ])
		}
	)
	
}
doStuff()