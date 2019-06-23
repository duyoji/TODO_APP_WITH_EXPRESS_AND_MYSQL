/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const assert = require("power-assert");

const index = require("../../../../db/models/index");

const DummyTodo = require("../../../../helper/createHelper");
const requestHelper = require("../../../../helper/requestHelper").request;

const getTodos = async () => {
  const response = await requestHelper({
    method: "get",
    endPoint: "api/todos",
    statusCode: 200,
  });
  return response;
};

const updateTodo = async (code, id, data) => {
  const response = await requestHelper({
    method: "put",
    endPoint: `api/todos/${id}`,
    statusCode: code,
  }).send(data);
  return response;
};

describe("TEST 「PUT /api/todos/:id」", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      const promise = index.Todo.create(
        new DummyTodo({
          title: `title ${i}`,
          body: `body ${i}`,
        })
      );
      promises.push(promise);
    }
    await Promise.all(promises);
  });
  after(async () => {
    await index.Todo.truncate();
  });

  it("idの引数に不正な値が入っていた場合、エラーが返る", async () => {
    const invalidIdList = [
      { id: 0 },
      { id: -1 },
      { id: "0" },
      { id: true },
      { id: undefined },
      { id: null },
      { id: [] },
      { id: {} },
    ];

    const data = {
      title: "title",
      body: "body",
    };

    invalidIdList.forEach(async id => {
      const response = updateTodo(400, data, id);
      assert.strictEqual(
        response.body.message,
        "idに適切でない値が入っています、1以上の数字を入れてください"
      );
    });
  });
});
