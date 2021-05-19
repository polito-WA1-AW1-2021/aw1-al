const express = require('express') ;
const morgan = require('morgan');

const app = express();
app.use(express.text());
app.use(morgan('dev'));

const list = ['banana', 'apple', 'milk', 'bread'];

app.get('/api/items', (req,res) => {
    res.json(list) ;
});

app.post('/api/items', (req, res) => {
    list.push(req.body);
    res.status(201).end();
});

app.listen(3001, ()=>{console.log('running')});