const express = require('express');
const path = require('path');
const app = express();

app.listen(8888, '127.0.0.1');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const blog = "blogs";
    res.render('index', { blog });
})

// app.post('/', (req, res) => {
//     // res.render('index', {result: req.body})
//     console.log(req.body)
// })