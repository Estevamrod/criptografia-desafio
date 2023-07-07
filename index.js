const express = require('express');
const userControl = require('./controllers/userController');
const app = express();

app.get('/',async(req,res) => {
    res.send('teste');
});

app.use(express.urlencoded({ extended: true }));

app.get('/upUser/:id', userControl.updateUser);

app.get('/delUser/:id', userControl.deleteUser);

app.post('/addUser/', userControl.createUser);

app.listen('1000',() => {
    console.log('Server running nice and ok on Localhost:1000');
});