const express = require("express");
const auth = require("./../middleware/auth");
const router = express.Router();
const pool = require("./../config/db");

router.post('/ticket/create',auth,async(req,res)=>{
  console.log(req.body);
  const { ticket_id } = req.body;
  try{
    const userQuery = await pool.query(`
    INSERT INTO tickets(ticket_id,status) 
    VALUES ('${ticket_id}','OPEN');
    `);
    console.log(userQuery)
    res.json({ticket_id
      ,status:'OPEN'});
  }catch(err){
    console.log(err);
    res.status(401);
  }
})

module.exports = router;