const express = require("express");
const auth = require("./../middleware/auth");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("./../config/db");

router.get("/users", async (req, res) => {
});

router.post("/users/createAcct", async (req, res) => {
});


router.get('/users/auth',auth,async(req,res)=>{
  res.json({message:"Yo you are auth congrats"});
})


router.post("/users/login/", async (req, res) => {
	//Login a registered user
  const {username,password} = req.body;
  const userQuery = await pool.query(`SELECT * FROM users where username = '${username}'`);
  if(userQuery.rows.length == 0){
    return res.status(401).send({ error: "Error: No username, Create Account" });
  }
  if(userQuery.rows.length){
    const result = await bcrypt.compare(password, userQuery.rows[0].password);
    const user = userQuery.rows[0];
    if(result){
      const {user_id,username} = user;
      const token = jwt.sign({
        user_id,
        username
      },"scret",{
        expiresIn: 300,
      })
      user.password = undefined
      res.json({auth:true, user, token});
    } else {
      return res.status(401).send({ error: "Login Fail: password"+error });
    }
  }
});

router.post("/users/me/logout",  async (req, res) => {
	// Log user out of the application

});

router.post("/users/me/logoutall",  async (req, res) => {
	// Log user out of all devices

});
module.exports = router;