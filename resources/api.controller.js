module.exports = {
  getTodos: (req, res) => {
    res.send("It's GET request method");
  },
  postTodo: (req, res) => {
    res.send("It's POST request method");
  },
  putTodo: (req, res) => {
    res.send("It's PUT request method");
  },
  deleteTodo: (req, res) => {
    res.send("It's DELETE request method");
  },
};
