const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;