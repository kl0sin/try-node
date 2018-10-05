const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "try-node"
});

function getConnection() {
  return pool;
}

router.get("/messages", (req, res) => {
  console.log("Show some messager or whatever...");
  res.end();
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const queryString = `SELECT * FROM users WHERE id = ?`;

  console.log("Fetching user with id: " + req.params.id);

  getConnection().query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log(`Failed to query for user: ${err}`);
      res.sendStatus(500);
      return;
    }

    const user = rows.map(row => {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name
      };
    });

    console.log("I think we fetched users successfully");
    res.json(user);
  });
});

router.get("/users/", (req, res) => {
  const queryString = "SELECT * FROM users";

  console.log("Fetching all users");

  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users");
      res.sendStatus(500);
      return;
    }

    const users = rows.map(row => {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name
      };
    });

    console.log("Fetching for users complete successfully");
    res.json(users);
  });
});

router.post("/user", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";

  getConnection().query(
    queryString,
    [firstName, lastName],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err);
        res.sendStatus(500);
        return;
      }
      console.log("Inserted a new user with id: ", results.insertId);
      res.end();
    }
  );
});

module.exports = router;
