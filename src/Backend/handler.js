let todos = [];

function getAllTodos(req, res) {
  res.send(todos);
}

function checkTodo(req, res, next) {
  let { task } = req.body;
  console.log('trigger');
  if (!task) {
    return res.status(400).send('Format Error');
  }
  next();
}
function createTodo(req, res) {
  let { task } = req.body;

  let todo = {
    id: todos.length + 1,
    task: task,
    time: new Date(),
  };

  todos.push(todo);
  res.status(201).send('Todo created');
}

function deleteTodo(req, res) {
  let { id } = req.params;
  let index = -1;
  todos.find((todo, i) => {
    if (todo.id == id) {
      index = i;
      return true;
    }
    return false;
  });
  if (index == -1) return res.status(404).send('Task not found');
  todos.splice(index, 1);
  res.status(200).send('Task Deleted');
}

module.exports = {
  getAllTodos,
  checkTodo,
  createTodo,
  deleteTodo,
};
