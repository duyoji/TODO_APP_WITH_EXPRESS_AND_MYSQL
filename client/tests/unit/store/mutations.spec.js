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
  });
});
