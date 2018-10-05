const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./routes/user')

app.use(router)

app.get('/', (req, res) => {
    console.log('Responding on root route!');
    res.send("Hello from root!");
});

app.listen(port, () => {
    console.log(`Server is up and listening on ${port}...`);
});