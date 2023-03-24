const pool = require("../config/db.js");
const userSeeds = require("./userSeeds.json");
const bcrypt = require("bcrypt");

async function doStuff(){

	console.log(' Dropping OLD Tables');
	await pool.query("DROP TABLE IF EXISTS tickets");
	await pool.query("DROP TABLE IF EXISTS users");
	await pool.query("DROP TABLE IF EXISTS groups");

	console.log(' Creating New Tables');
	await pool.query(`CREATE TABLE groups(
		group_id SERIAL PRIMARY KEY,
		group_name VARCHAR(255));
	`)
	console.log(' Creating insert root');
	await pool.query(
		"INSERT INTO groups (group_name) VALUES($1)",
		['root' ])
	
	console.log(' Creating Insert into groups');

	await pool.query(
		"INSERT INTO groups (group_name) VALUES($1)",
		['ripstop' ])
	

	console.log(' Creating New Tables users');
	await pool.query(`CREATE TABLE users(
		user_id SERIAL PRIMARY KEY, 
		username VARCHAR(255),
		group_id INT,
		adminlevel INT,
		password VARCHAR(255));
		`)
		
	await pool.query(`CREATE TABLE tickets(
			ticket_id VARCHAR(16) PRIMARY KEY NOT NULL, 
			date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			to_be_done TIMESTAMPTZ,
			group_id VARCHAR(255), 
			customer_name VARCHAR(64),
			customer_phone BIGINT,
			remake VARCHAR(64),
			price INT,
			paid BOOLEAN,
			status VARCHAR(50));
			`)
		
	console.log(' Seeding Users Tables');

	userSeeds.forEach(async (entry,index) =>{
		const saltRounds = 4;
		const password = await bcrypt.hash(entry.password, saltRounds);		
		await pool.query(
			"INSERT INTO users (username,password,adminlevel, group_id) VALUES($1,$2,$3,$4)",
			[entry.username, password, entry.adminlevel, entry.group_id ])
		}
	)
	
}
doStuff()