const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(8888, '127.0.0.1');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const blog = "blogs";
    res.render('index', { blog });
})
app.post('/', (req, res) => {
    console.log(req.body)
})
