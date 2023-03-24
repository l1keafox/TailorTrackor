const pool = require("../config/db.js");
const userSeeds = require("./userSeeds.json");
const bcrypt = require("bcrypt");

async function doStuff(){

	console.log(' Dropping OLD Tables');
	await pool.query("DROP TABLE IF EXISTS users");
	await pool.query("DROP TABLE IF EXISTS tickets");

	console.log(' Creating New Tables');
	await pool.query(`CREATE TABLE users(
		user_id SERIAL PRIMARY KEY, 
		username VARCHAR(255),
		store_name VARCHAR(255),
		adminlevel INT,
		password VARCHAR(255));
		`)
	
		// date_created
		// to_be_done
		// customer_name
		// garment
		// price
		// Paid or not.

		// last_worker
		// last_updated 
		
	await pool.query(`CREATE TABLE tickets(
			ticket_id VARCHAR(16) PRIMARY KEY, 
			
			status VARCHAR(50));
			`)
		
	console.log(' Seeding Users Tables');

	userSeeds.forEach(async (entry,index) =>{
		const saltRounds = 4;
		const password = await bcrypt.hash(entry.password, saltRounds);		
		await pool.query(
			"INSERT INTO users (username,password,adminlevel) VALUES($1,$2,$3)",
			[entry.username, password, entry.adminlevel ])
		}
	)
	
}
doStuff()