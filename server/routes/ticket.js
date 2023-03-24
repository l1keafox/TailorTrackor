const express = require("express");
const auth = require("./../middleware/auth");
const router = express.Router();
const pool = require("./../config/db");
const { route } = require("./user");

router.post('/ticket/create',auth,async(req,res)=>{
  const { ticket_id } = req.body;
  try{

    const userQuery = await pool.query(`
    INSERT INTO tickets(ticket_id,status) 
    VALUES ('${ticket_id}','NEW');
    `);
    console.log(userQuery)
    res.json({ticket_id
      ,status:'NEW'});
  }catch(err){
    console.log(err);
    res.status(401);
  }
})

router.post('/ticket/update',auth,async(req,res)=>{
  const { ticket_id,status } = req.body;
  try{
    console.log(ticket_id,status,req.body);
    const userQuery = await pool.query(`
    UPDATE tickets
    SET status = '${status}'
    WHERE
    ticket_id = '${ticket_id}';
    `);
    console.log(userQuery, "UPDATING");
    res.json({ticket_id
      ,status});
  }catch(err){
    console.log(err);
    res.status(401);
  }
})


// This does not authicate
router.get('/ticket/:ticket_id',async(req,res)=>{
  console.log(req.params);
  const {ticket_id} = req.params;
  try{  
    const findTicket = await pool.query(`
    SELECT * FROM tickets WHERE ticket_id = '${ticket_id}'
    `);
    console.log(findTicket.rows);
    if(findTicket.rows.length){
      res.json(findTicket.rows[0]);
    }
  }catch(err){
    console.log(err);
  }
})

module.exports = router;