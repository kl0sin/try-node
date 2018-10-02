const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 3000;

app.use(morgan('combined'));

app.get('/', (req, res) => {
    console.log('Responding to root route');
    res.send("Hello from root!");
});

app.get('/users', (req, res) => {
    console.log('Get users data');

    const user = {
        firstName: 'John',
        lastName: 'Colins'
    };
    const user1 = {
        firstName: 'Tony',
        lastName: 'Durant'
    }

    res.json([user, user1])

});

app.listen(port, () => {
    console.log(`Server is up and listening on ${port}...`);
});