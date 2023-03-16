const express = require("express");
const auth = require("./../middleware/auth");
const router = express.Router();
const pool = require("./../config/db");

router.post('/ticket/create',auth,async(req,res)=>{
  console.log(req.body);
  const { ticket_id } = req.body;
  console.log(`
  INSERT INTO tickets(ticket_id,status) 
  VALUES ('${ticket_id}','OPEN');
  `)
  const userQuery = await pool.query(`
  INSERT INTO tickets(ticket_id,status) 
  VALUES ('${ticket_id}','OPEN');
  `);

  res.json({message:userQuery});
})

module.exports = router;