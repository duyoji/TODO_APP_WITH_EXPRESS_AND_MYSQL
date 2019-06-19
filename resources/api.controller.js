module.exports = {
  getTodos: (req, res) => {
    res.status(200).send("It's GET request method");
  },
  postTodo: (req, res) => {
    res.status(200).send("It's POST request method");
  },
  putTodo: (req, res) => {
    res.status(200).send("It's PUT request method");
  },
  deleteTodo: (req, res) => {
    res.status(200).send("It's DELETE request method");
  },
};
