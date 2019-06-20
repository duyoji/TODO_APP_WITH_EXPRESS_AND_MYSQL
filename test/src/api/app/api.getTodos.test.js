/* eslint-disable no-undef */
const requestHelper = require("../../../../helper/requestHelper").request;
const assert = require("power-assert");

describe("test 「GET /api/todos」", () => {
  it("getリクエストで返されたデータは適切である", async () => {
    const response = await requestHelper({
      method: "get",
      endPoint: "/api/todos",
      statusCode: 200,
    });
    // responseはjsonなので分解する
    const todos = response.body;

    // todosは配列である
    assert.strictEqual(Array.isArray(todos), true);

    todos.forEach(todo => {
      assert.strictEqual(typeof todo.id, "number");
      assert.strictEqual(typeof todo.title, "string");
      assert.strictEqual(typeof todo.body, "string");
      assert.strictEqual(typeof todo.completed, "boolean");
      assert.strictEqual(typeof todo.createdAt, "string");
      assert.strictEqual(typeof todo.updatedAt, "string");
    });
    q;
  });
});
