import mutations from "@/store/mutations";
import moment from "moment";

const state = {
  todos: []
};

let nextID = 1;

class Todo {
  constructor({ title, body }) {
    this.id = nextID++;
    this.title = title;
    this.body = body;
    this.completed = false;
    this.createdAt = moment().format("YYYY年 MM月 Do(ddd), kk時mm分 ");
    this.updatedAt = moment().format("YYYY年 MM月 Do(ddd), kk時mm分 ");
  }
}

describe("TEST mutations.js", () => {
  it("setTodosは、渡されたTodoデータをstate.todosにセットする", () => {
    const todos = [];

    for (let i = 0; i < 5; i++) {
      const todo = new Todo({
        title: "タイトル" + 1,
        body: "内容" + 1
      });
      todos.push({ ...todo });
    }

    mutations.setTodos(state, todos);

    expect(state.todos).toEqual(todos);
  });
  it("addTodoは、渡されたTodoデータをstate.todosの末尾に追加する", () => {
    const newTodo = new Todo({
      title: "new title",
      body: "new body"
    });

    mutations.addTodo(state, newTodo);

    expect(state.todos[5]).toEqual(newTodo);
  });
});
