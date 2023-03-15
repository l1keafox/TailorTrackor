const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("./../config/db");

router.get("/users", async (req, res) => {
  console.log("GER?");
});

router.post("/users/createAcct", async (req, res) => {
});

router.post("/users/login/", async (req, res) => {
	//Login a registered user
  const {username,password} = req.body;
  let ditto = await pool.query(`SELECT * FROM users where username = '${username}'`);
  console.log(ditto.rows);
  if(ditto.rows.length == 0){
    return res.status(401).send({ error: "Error: No username, Create Account" });
  }
  if(ditto.rows.length){
    const result = await bcrypt.compare(password, ditto.rows[0].password);
    if(result){
      res.send({ user:ditto.rows[0] });
    } else {
      return res.status(401).send({ error: "Login Fail: password"+error });
    }
  }
  console.log(req.body,"BODY?");
  console.log(username,password);
});

router.post("/users/me/logout",  async (req, res) => {
	// Log user out of the application

});

router.post("/users/me/logoutall",  async (req, res) => {
	// Log user out of all devices

});
module.exports = router;