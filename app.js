const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const app = express();

// apiURI
const apiURI = 'mongodb+srv://iAmWayne:thisiswayne@iamwayne.yzuab.mongodb.net/todo_app?retryWrites=true&w=majority';

app.use(express.urlencoded({extended: true}));

//connect to mongoDB cloud storage
mongoose.connect(apiURI)
    .then( _ => app.listen(8888, '127.0.0.1'))
    .catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/', (req, res) => {
    Todo.find()
        .then( result => {
            res.render('index', { todo:result }); // pass result to index
        })
        .catch( err => console.log(err))
});

app.post('/', (req, res) => {
    if(req.body.text) {
        const todo = new Todo({
            text: req.body.text,
            done: req.body.done
        });

        todo.save()
            .then( _ => {
                res.redirect('/'); // redirect if success
            })
            .catch( err => console.log(err));

    } else {
        console.log(0)
    }
});

app.delete('/todo/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then( result => {
            res.json({ redirect: '/'})
        })
        .catch( err => console.log(err));
});

app.put('/todo/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, { done: true })
        .then( result => {
            res.json({ redirect: '/'})
        })
        .catch( err => console.log(err));
})
