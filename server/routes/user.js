const express = require("express");
//const auth = require("../middleware/auth");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("./../config/db");

router.get("/users", async (req, res) => {
  console.log("GER?");
});

router.post("/users/createAcct", async (req, res) => {
});

const auth = (req,res,next) =>{
  const token = req.headers["x-access-token"]
  if(!token){
    res.send({message:"No token"})
  } else {
    jwt.verify(token,"scret", (err,decoded) =>{
      if(err){
        res.json({auth:false,message:"Fail authenticate"});
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

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
      //req.session.user = result;
      console.log(user);
      const id = user.user_id;
      const token = jwt.sign({id},"scret",{
        expiresIn: 300,
      })
      // console.log(req.session)
      // res.send(user);
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