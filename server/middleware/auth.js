
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
  const token = req.headers["x-access-token"]
  if(!token){
    res.send({message:"No token"})
  } else {
    jwt.verify(token,"scret", (err,decoded) =>{
      if(err){
        console.log("fail",err);
        res.json({auth:false,message:"Fail authenticate"});
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}