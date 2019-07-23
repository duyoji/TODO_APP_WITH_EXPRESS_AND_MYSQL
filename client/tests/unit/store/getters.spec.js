import getters from "@/store/getters";

const state = {
  todos: [
    {
      id: 1,
      title: "getters title",
      body: "getters body",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

describe("TEST getters.js", () => {
  it("getters.todosはstate.todosを返す", () => {
    const result = getters.todos(state);
    expect(result).toEqual([
      {
        id: 1,
        title: "getters title",
        body: "getters body",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  });
});
