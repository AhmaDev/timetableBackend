var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db);

/* GET users listing. */
router.get('/', function (req, res, next) {
    connection.query(`SELECT * FROM section`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        }
    })
});

module.exports = router;
