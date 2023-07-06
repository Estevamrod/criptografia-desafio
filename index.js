const express = require('express');
const app = express();

app.get('/',async(req,res) => {
    res.send('teste');
});

app.listen('1000',() => {
    console.log('Server running nice and ok on Localhost:1000');
});