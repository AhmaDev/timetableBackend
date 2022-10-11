var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db);

/* GET users listing. */
router.get('/', function (req, res, next) {

    let query = '';
    let order = '';
    let limit = '';

    if (req.query.studentId != undefined) {
        query = query + ` AND studentid = ${req.query.studentId}`
    }

    if (req.query.name != undefined) {
        query = query + ` AND name LIKE '%${req.query.name}%'`
    }

    if (req.query.level != undefined) {
        query = query + ` AND level = ${req.query.level}`
    }

    if (req.query.year != undefined) {
        query = query + ` AND year = '${req.query.year}'`
    }

    if (req.query.title != undefined) {
        query = query + ` AND titel LIKE '%${req.query.title}%'`
    }

    if (req.query.number != undefined) {
        query = query + ` AND number = '${req.query.number}'`
    }

    if (req.query.date != undefined) {
        query = query + ` AND DATE(date) = '${req.query.date}'`
    }

    if (req.query.dateRangeFrom != undefined && req.query.dateRangeTo != undefined) {
        query = query + ` AND DATE(date) BETWEEN '${req.query.dateRangeFrom}' AND '${req.query.dateRangeTo}'`
    }


    if (req.query.order != undefined) {
        order = 'ORDER BY ' + req.query.order + ' ' + req.query.sort
    }

    if (req.query.limit != undefined) {
        limit = `LIMIT ${req.query.limit}`
    }

    connection.query(`SELECT * FROM admin_order WHERE 1=1 ${query} ${order} ${limit}`, (err, result) => {
        res.send(result)
        console.log(err);
    })
});

router.delete('/delete', function (req, res, next) {
    connection.query(`DELETE FROM admin_order WHERE id IN (${req.body.orders})`, (err, result) => {
        res.send(result)
    })
});


router.put('/edit', function (req, res, next) {
    connection.query(`UPDATE admin_order SET ? WHERE id IN (${req.body.orders})`, [req.body.newBody], (err, result) => {
        res.send(result)
    })
});

router.post('/add', (req, res) => {
    connection.query(
        "INSERT INTO admin_order (number ,title, text , level , date , year ,user, studentid) VALUES ? ",
        [
            req.body.students.map((student) => [
                req.body.order.number,
                req.body.order.title,
                req.body.order.text,
                req.body.order.level,
                req.body.order.date,
                req.body.order.year,
                req.body.order.user,
                student,
            ]),
        ],

        (err, result) => {
            if (err) {
                console.log("error: ", err);
                res.sendStatus(500)
                return;
            }

            res.send({message: 'ok'})
        }
    );
})

module.exports = router;
