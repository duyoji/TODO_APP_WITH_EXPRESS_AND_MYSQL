import actions from "@/store/actions";

let url = "";
let body = {};
let mockError = false;

jest.mock("axios", () => ({
  get: _url => {
    return new Promise(resolve => {
      if (mockError) {
        // テスト内で以下のように記述されていて、toThrowに引数として、"Error"という文字列を渡していたため、
        // `throw new Error('Error'); ` のように'Error'という文字列(message)を含んだErrorオブジェクトをthrowした
        //
        // await expect(actions.fetchTodos({ commit: jest.fn() }, {})).rejects.toThrow(
        //   "Error"
        // );
        throw new Error('Error');
      }
      url = _url;
      resolve({ data: true });
    });
  },
  post: (_url, _body) => {
    return new Promise(resolve => {
      if (mockError) {
        throw Error();
      }
      url = _url;
      body = _body;
      resolve({ data: true });
    });
  },
  put: (_url, _body) => {
    return new Promise(resolve => {
      if (mockError) {
        throw Error();
      }
      url = _url;
      body = _body;
      resolve({ data: true });
    });
  }
}));

describe("TEST acitons.js", () => {
  afterEach(() => {
    mockError = false;
  });
  it("actions.fetchTodosは、DBからTodoデータを引き出し、mutations.setTodosに渡す", async () => {
    const commit = jest.fn();
    await actions.fetchTodos({ commit });

    expect(url).toBe("http://localhost:8040/api/todos");
    expect(commit).toHaveBeenCalledWith("setTodos", true);
  });
  it("acitons.fetchTodosのエラー発生時テスト", async () => {
    mockError = true;

    await expect(actions.fetchTodos({ commit: jest.fn() }, {})).rejects.toThrow(
      "Error"
    );
  });
  it("actions.postTodoは、DBに新たなTodo１件を作成し、作成したTodoをmutations.addTodoに渡す", async () => {
    const commit = jest.fn();
    const newTitle = "new Title";
    const newBody = "new Body";

    await actions.postTodo({ commit }, { newTitle, newBody });

    expect(url).toBe("http://localhost:8040/api/todos");
    expect(body).toEqual({ title: newTitle, body: newBody, completed: false });
    expect(commit).toHaveBeenCalledWith("addTodo", true);
  });
  it("actions.postTodoのエラー発生時テスト", async () => {
    mockError = true;

    await expect(actions.postTodo({ commit: jest.fn() }, {})).rejects.toThrow(
      "Error"
    );
  });
  it("actions.putTodoは、渡されたidと合致するTodo一件のtitleとbodyを変更し、変更したTodoをmutations.updateTodoに渡す", async () => {
    const commit = jest.fn();
    const editData = {
      id: 1,
      title: "update Title",
      body: "update Body"
    };

    await actions.putTodo({ commit }, editData);

    expect(url).toBe(`http://localhost:8040/api/todos/${editData.id}`);
    expect(body).toEqual({ title: editData.title, body: editData.body });
    expect(commit).toHaveBeenCalledWith("updateTodo", true);
  });
  it("actions.putTodoのエラー発生時テスト", async () => {
    mockError = true;

    await expect(actions.putTodo({ commit: jest.fn() }, {})).rejects.toThrow(
      "Error"
    );
  });
});
