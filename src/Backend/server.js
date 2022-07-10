const express = require('express');
const cors = require('cors');
let app = express();
const { getAllTodos, checkTodo, createTodo, deleteTodo } = require('./handler');

app.use(cors());

app.use(express.json());

app.delete('/todo/:id', deleteTodo);
app.post('/todo', checkTodo, createTodo);
app.get('/todos', getAllTodos);

app.all('/*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000);
