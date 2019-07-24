export default {
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.push(todo);
  }
};
