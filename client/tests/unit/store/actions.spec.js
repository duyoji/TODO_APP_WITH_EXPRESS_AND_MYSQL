import actions from "@/store/actions";

let url = "";
let body = {};

jest.mock("axios", () => ({
  get: _url => {
    return new Promise(resolve => {
      url = _url;
      resolve(true);
    });
  }
}));

describe("TEST acitons.js", () => {
  it("actions.fetchTodosは、DBからTodoデータを引き出し、mutations.setTodosに渡す", async () => {
    const commit = jest.fn();
    await actions.fetchTodos({ commit });

    expect(url).toBe();
    expect(commit).toHaveBeenCalledWith(true);
  });
});
