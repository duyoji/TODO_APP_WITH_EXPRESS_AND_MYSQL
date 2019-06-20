const index = require("../db/models/index");

module.exports = {
  getTodos: async (req, res) => {
    const todos = await index.todos.findAll({});

    res.status(200).json(todos);
  },
  postTodo: (req, res) => {
    res.status(200).send("It's POST request method");
  },
  putTodo: (req, res) => {
    res.status(200).send(`It's PUT request method ID: ${req.params.id}`);
  },
  deleteTodo: (req, res) => {
    res.status(200).send(`It's DELETE request method ID: ${req.params.id}`);
  },
};
