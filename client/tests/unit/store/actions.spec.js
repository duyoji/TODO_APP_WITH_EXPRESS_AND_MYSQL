import actions from "@/store/actions";

let url = "";
let body = {};
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

		await expect(actions.fetchTodos({ commit: jest.fn() }, {}))
    .rejects.toThrow("APIエラーが発生しました")
  });
});
