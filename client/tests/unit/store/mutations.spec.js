import mutations from "@/store/mutations";

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
    this.createdAt = new Date();
    this.updatedAt = new Date();
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
  it("updateTodoは、指定したIDの値と合致するTodo一件のtitleとbodyを変更する", () => {
    const editData = {
      id: 1,
      title: "update title",
      body: "update text",
      updatedAt: new Date()
    };

    mutations.updateTodo(state, editData);

    expect(state.todos[0]).toMatchObject(
      { id: editData.id },
      { title: editData.title },
      { body: editData.body }
    );
    expect(Math.max(state.todos[0].createdAt)).toBeLessThan(
      Math.max(state.todos[0].updatedAt)
    );
  });
  it("deleteTodoは、指定したIDの値と合致するTodo１件を削除する", () => {
    const oldTodos = state.todos.slice();
    const id = 1;

    mutations.deleteTodo(state, id);

    expect(state.todos[0]).not.toEqual(oldTodos[0]);
  });
  it("switchCompletedは、指定したIDの値と合致するTodo１件のcompletedに入っている真偽値を反転する", () => {
    const id = 2;

    mutations.switchCompleted(state.id);

    expect(state.todos[0]).toBe(true);
  });
});
