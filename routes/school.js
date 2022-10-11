var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db);

/* GET users listing. */
router.get('/student/:studentId', function (req, res, next) {
    connection.query(`SELECT * FROM school WHERE studentid = ${req.params.studentId}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        }
    })
});

router.post('/edit/:studentId', function (req, res, next) {
    connection.query(`SELECT * FROM school WHERE studentid = ${req.params.studentId}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            if (result.length > 0) {
                connection.query(`UPDATE school SET ? WHERE studentid = ${req.params.studentId}`, [req.body], (err, result) => {
                    res.send(result);
                })
            } else {
                connection.query(`INSERT INTO school SET ?`, [req.body], (err, result) => {
                    res.send(result);
                })
            }
        }
    })
});


module.exports = router;
