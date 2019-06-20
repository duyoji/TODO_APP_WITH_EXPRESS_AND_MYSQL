class CreateTodo {
  constructor({ username, body }) {
    this.username = username;
    this.body = body;
    this.completed = false;
  }
}

module.exports = CreateTodo;
