import actions from "@/store/actions";

let url = "";
let mockError = false;

jest.mock("axios", () => ({
  get: _url => {
    return new Promise(resolve => {
      if (mockError) {
        throw Error();
      }
      url = _url;
      resolve({ data: true });
    });
  },
  post: (_url, { title, body }) => {
    return new Promise(resolve => {
      if (mockError) {
        throw Error();
      }
      url = _url;
      resolve({
        title,
        body
      });
    });
  }
}));

describe("TEST acitons.js", () => {
  it("actions.fetchTodosは、DBからTodoデータを引き出し、mutations.setTodosに渡す", async () => {
    const commit = jest.fn();
    await actions.fetchTodos({ commit });

    expect(url).toBe("http://localhost:8040/api/todos");
    expect(commit).toHaveBeenCalledWith("setTodos", true);
  });
  it("acitons.fetchTodosのエラー発生時テスト", async () => {
    mockError = true;

    await expect(actions.fetchTodos({ commit: jest.fn() }, {})).rejects.toThrow(
      "APIエラーが発生しました"
    );
  });
  it("actions.postTodoは、DBに新たなTodo１件を作成し、作成したTodoをmutations.addTodoに渡す", async () => {});
});
