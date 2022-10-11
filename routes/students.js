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

    if (req.query.sectionid != undefined || req.query.sectionid != null) {
        query = query + ` AND sectionid = ${req.query.sectionid}`
    }

    if (req.query.name != undefined || req.query.name != null) {
        query = query + ` AND name LIKE '%${req.query.name}%'`
    }

    if (req.query.level != undefined || req.query.level != null) {
        query = query + ` AND level = ${req.query.level}`
    }

    if (req.query.enterYear != undefined || req.query.enterYear != null) {
        query = query + ` AND enter_year = '${req.query.enterYear}'`
    }

    if (req.query.graduationYear != undefined || req.query.graduationYear != null) {
        query = query + ` AND grdat = '${req.query.graduationYear}'`
    }

    if (req.query.class != undefined || req.query.class != null) {
        query = query + ` AND class = '${req.query.class}'`
    }

    if (req.query.date != undefined || req.query.date != null) {
        query = query + ` AND DATE(date) = '${req.query.date}'`
    }

    if (req.query.dateRangeFrom != undefined && req.query.dateRangeTo != undefined) {
        query = query + ` AND DATE(date) BETWEEN '${req.query.dateRangeFrom}' AND '${req.query.dateRangeTo}'`
    }

    if (req.query.type != undefined || req.query.type != null) {
        query = query + ` AND type = '${req.query.type}'`
    }

    if (req.query.status != undefined || req.query.status != null) {
        query = query + ` AND status = ${req.query.status}`
    }


    if (req.query.order != undefined) {
        order = 'ORDER BY ' + req.query.order + ' ' + req.query.sort
    }

    if (req.query.limit != undefined) {
        limit = `LIMIT ${req.query.limit}`
    }

    connection.query(`SELECT * FROM student JOIN school ON student.id = school.studentid WHERE 1=1 ${query} ${order} ${limit}`, (err, result) => {
        res.send(result)
        console.log(err);
    })

});

router.get('/id/:id', function (req, res, next) {
    connection.query("SELECT * FROM student WHERE id = ?", [req.params['id']], (err, result) => {
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
});

router.get('/email/:email', function (req, res, next) {
    connection.query("SELECT id As studentId,name,type As studyType,enter_year, email,(SELECT name FROM section WHERE id = student.sectionid) As sectionName,sectionid,level level,class As className,sex,status FROM student WHERE email = ? LIMIT 1", [req.params['email']], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        }
    })
});

router.post('/new', (req, res) => {
    if (req.body.name == undefined || req.body.name == null || req.body.college_number == undefined || req.body.college_number == null) {
        res.sendStatus(500);
    } else {
        connection.query(`INSERT INTO student SET ?`, req.body, (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    }
})

router.put('/edit/:id', (req, res) => {
        connection.query(`UPDATE student SET ? WHERE id = ${req.params.id}`, req.body, (err, result) => {
            if (err) {
                res.sendStatus(500);
                console.log(err);
            } else {
                res.send(result);
            }
        })
})


module.exports = router;
