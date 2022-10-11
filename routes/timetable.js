var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/database');
var db2 = require('../config/timeTableDatabase');
var connection = mysql.createConnection(db);
var connection2 = mysql.createConnection(db2);


router.get('/halls/:sectionId', function(req, res, next) {
    connection2.query(`SELECT * FROM halls WHERE sectionId = ${req.params.sectionId}`,(err,result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    })
});


router.get('/halls', function(req, res, next) {
    connection2.query(`SELECT * FROM halls`,(err,result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    })
});



router.delete('/halls/:hallId', function(req, res, next) {
    connection2.query(`DELETE FROM halls WHERE idHall = ${req.params.hallId}`,(err,result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    })
});

router.post('/halls', function(req, res, next) {
    connection2.query(`INSERT INTO halls SET ?`,[req.body] ,(err, result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    })
})

router.get('/schedule/:level/:year/:course/:sectionId', function(req, res, next) {
    connection2.query(`SELECT * FROM schedule WHERE level = ${req.params.level} AND year = '${req.params.year}' AND course = ${req.params.course} AND sectionId = ${req.params.sectionId}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.sendStatus(404);
        }
    })
});



router.get('/schedules/:sectionId/:year/:course', function(req, res, next) {
    connection2.query(`SELECT * FROM schedule WHERE year = '${req.params.year}' AND course = ${req.params.course} AND sectionId = ${req.params.sectionId}`, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        if (result.length > 0) {
            result.forEach(r => {
                r.levelData = JSON.parse(r.levelData);
                r.schedule = JSON.parse(r.schedule);
            })
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })
});

router.get('/allSchedules/:year/:course', function(req, res, next) {
    connection2.query(`SELECT * FROM schedule WHERE year = '${req.params.year}' AND course = ${req.params.course}`, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        if (result.length > 0) {
            result.forEach(r => {
                r.levelData = JSON.parse(r.levelData);
                r.schedule = JSON.parse(r.schedule);
            })
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })
});

router.post('/schedule', function(req, res, next) {
    connection2.query(`INSERT INTO schedule SET ?`,[req.body] ,(err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.send(result);
    });
});

router.put('/schedule/:id', function(req, res, next) {
    connection2.query(`UPDATE schedule SET ? WHERE idSchedule = ${req.params.id}`,[req.body] ,(err, result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    });
})


router.delete('/schedule/:id', function(req, res, next) {
    connection2.query(`DELETE FROM schedule WHERE idSchedule = ${req.params.id}`,(err, result) => {
        if (err) {
            res.sendStatus(500);
            return
        }
        res.send(result);
    });
})
module.exports = router;
