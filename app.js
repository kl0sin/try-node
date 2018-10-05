const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'try-node'
});

app.use(cors());

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Responding on root route!');
    
    res.send("Hello from root!");
});

app.get('/user/:id', (req, res) => {    
    const userId = req.params.id;
    const queryString = `SELECT * FROM users WHERE id = ?`

    console.log('Fetching user with id: ' + req.params.id);

    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) { 
            console.log(`Failed to query for user: ${err}`);
            res.sendStatus(500);
            return
        }

        const user = rows.map((row) => {
            return {
                id: row.id,
                firstName: row.first_name,
                lastName: row.last_name
            }
        });

        console.log('I think we fetched users successfully');
        res.json(user);
    });
})

app.get('/users/', (req, res) => {
    const queryString = 'SELECT * FROM users';

    console.log('Fetching all users');

    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('Failed to query for users');
            res.sendStatus(500);
            return
        };

        const users = rows.map((row) => {
            return {
                id: row.id,
                firstName: row.first_name,
                lastName: row.last_name
            }
        });

        console.log('Fetching for users complete successfully');
        res.json(users);
    });
});

app.post('/user', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const queryString = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)';
    
    connection.query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log('Failed to insert new user: ' + err)
            res.sendStatus(500)
            return
        }
        console.log('Inserted a new user with id: ', results.insertId);
        res.end();
    })

});

app.listen(port, () => {
    console.log(`Server is up and listening on ${port}...`);
});