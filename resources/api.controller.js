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
      if (!req.body.title) {
        throw new Error("titleを送信してください");
      }
      if (!req.body.body) {
        throw new Error("bodyを送信してください");
      }
      if (
        typeof req.body.completed !== "boolean" &&
        req.body.completed !== undefined
      ) {
        throw new Error("completedにはboolean型のみを入力してください");
      }

      const todo = await index.Todo.create(
        {
          title: req.body.title,
          body: req.body.body,
          completed: req.body.completed,
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
  putTodo: async (req, res) => {
    const t = await index.sequelize.transaction();
    try {
      const parseId = parseInt(req.params.id, 10);
      if (typeof parseId !== "number" || parseId < 1) {
        throw new Error(
          "idに適切でない値が入っています、1以上の数字を入れてください"
        );
      }
      if (
        typeof req.body.completed !== "boolean" &&
        req.body.completed !== undefined
      ) {
        throw new Error("completedにはboolean型のみを入力してください");
      }
      const findedTodo = index.Todo.findOne({
        where: parseId,
      });
      if (!findedTodo) {
        throw new Error(
          `検索結果: ID:${parseId}に該当するTodoは見つかりませんでした`
        );
      }

      let title;
      let body;
      let completed;

      if (!req.body.title) {
        title = findedTodo.title;
      } else {
        title = req.body.title;
      }

      if (!req.body.body) {
        body = findedTodo.body;
      } else {
        body = req.body.body;
      }

      if (!req.body.completed) {
        completed = findedTodo.completed;
      } else {
        completed = req.body.completed;
      }

      const todo = await index.Todo.update(
        { title: title, body: body, completed: completed },
        { where: { id: parseId } },
        { t }
      );

      await t.commit();
      res.status(200).json(todo);
    } catch (err) {
      await t.rollback();
      res.status(400).json({ message: err.message });
    }
  },
  deleteTodo: (req, res) => {
    res.status(200).send(`It's DELETE request method ID: ${req.params.id}`);
  },
};
