const express = require('express');
const userControl = require('./controllers/userController');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

app.get('/', async(req,res) => {
    res.json({
        'instructions': {
            'GET': {
                'instruction': 'you just type /get and press enter and you got all the data in DB',
                'syntax': 'localhost:1000/get'
            },
            'ADD': {
                'instruction': 'you dont need a param, but you need to create some keys with default values => (userDocument, creditCardToken and value) and provide data.',
                'syntax': 'localhost:1000/add'
            },
            'UPGRADE': {
                'instruction': 'mainly you need pass a param and 3 default keys, these keys you choose what you want, you use to change some data so you can use 3 of them (userDocument, creditCardToken or value).',
                'syntax': 'localhost:1000/update/:id (can be 1,2,3...)'
            },
            'DELETE': {
                'instruction': 'you just need to pass a valid param to URL and the magic happen',
                'syntax': 'localhost:1000/delete/:id (can be 1,2,3...)'
            }
        }
    });
});

app.get('/get', userControl.get);

app.get('/getbyID/:id', userControl.getbyId);

app.get('/update/:id', userControl.updateUser);

app.get('/delete/:id', userControl.deleteUser);

app.post('/add/', userControl.createUser);

module.exports = app;