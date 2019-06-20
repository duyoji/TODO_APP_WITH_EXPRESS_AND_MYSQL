const index = require("../db/models/index");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await index.Todo.findAll({});

      res.status(200).json(todos);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  postTodo: async (req, res) => {
    const t = await index.sequelize.transaction();
    try {
      const todo = await index.Todo.create(
        {
          title: req.body.title,
          body: req.body.body,
        },
        { t }
      );
      await t.commit();
      res.status(200).json(todo);
    } catch (err) {
      await t.rollback();
      res.status(400).json({ message: err.message });
    }
  },
  putTodo: (req, res) => {
    res.status(200).send(`It's PUT request method ID: ${req.params.id}`);
  },
  deleteTodo: (req, res) => {
    res.status(200).send(`It's DELETE request method ID: ${req.params.id}`);
  },
};
