import getters from "@/store/getters";
import moment from "moment";

const state = {
  todos: [
    {
      id: 1,
      title: "getters title",
      body: "getters body",
      completed: false,
      createdAt: moment().format("YYYY年 MM月 Do(ddd), kk時mm分 "),
      updatedAt: moment().format("YYYY年 MM月 Do(ddd), kk時mm分 ")
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
        createdAt: moment().format("YYYY年 MM月 Do(ddd), kk時mm分 "),
        updatedAt: moment().format("YYYY年 MM月 Do(ddd), kk時mm分 ")
      }
    ]);
  });
});
