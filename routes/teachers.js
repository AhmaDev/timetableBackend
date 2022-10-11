var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db);


router.post('/login',(req,res) => {
    if (req.body.email == undefined || 
        req.body.email == null || 
        req.body.password == undefined || 
        req.body.password == null || 
        req.body.email == "" || 
        req.body.password == "" 
        ) {
        res.sendStatus(500);
        return;
    }
  connection.query(`SELECT * FROM teacher WHERE email = '${req.body.email}' AND password = '${req.body.password}'`,(err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.sendStatus(404);
      }
    }
  })
})

module.exports = router;
