var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var db = require("../config/database");
var connection = mysql.createConnection(db);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE name = '${req.body.username}' AND password = '${req.body.password}'`,
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.sendStatus(404);
        }
      }
    },
  );
});

module.exports = router;
