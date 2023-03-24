const express = require("express");
const auth = require("./../middleware/auth");
const router = express.Router();
const pool = require("./../config/db");
const { route } = require("./user");
const dayJs = require('dayjs');
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
  const { ticket_id, status, date, price,name,phone,doneBy,remake } = req.body;
  try{
    console.log("DFSDF",ticket_id, status, date, price,name,phone,doneBy,remake);
    const dayDone  = dayJs(doneBy);
    const dayCreated  = dayJs(date);
    let query = 'UPDATE tickets SET ';
    if(status){
      query += `status = '${status}',`;
    }
    if(doneBy){
      query += `to_be_done = '${dayDone.$y}-${dayDone.$M+1}-${dayDone.$D}',`;
    }
    if(date){
      query += `date_created = '${dayCreated.$y}-${dayCreated.$M+1}-${dayCreated.$D}',`;
    }
    if(name){
      query += `customer_name = '${name}',`;
    }
    if(remake){
      query += `remake = '${remake}',`;
    }
    if(price){
      query += `price = '${price}',`;
    }
    if(phone){
      query += `customer_phone = ${phone},`;
    }
    String.prototype.replaceLast = function (search, replace) {
      return this.replace(new RegExp(search+"([^"+search+"]*)$"), replace+"$1");
    }
    query = query.replaceLast(",", ";");
    console.log(query);

    const userQuery = await pool.query(query);
    console.log(userQuery, "UPDATING");
    res.json({ticket_id, status, date, price,name,phone,doneBy,remake});
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