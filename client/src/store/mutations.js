export default {
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.push(todo);
  },
  updateTodo(state, editData) {
    const updateIndex = state.todos.findIndex(todo => editData.id === todo.id);
    state.todos[updateIndex].title = editData.title;
    state.todos[updateIndex].body = editData.body;
    state.todos[updateIndex].updatedAt = editData.updatedAt;
  }
};
