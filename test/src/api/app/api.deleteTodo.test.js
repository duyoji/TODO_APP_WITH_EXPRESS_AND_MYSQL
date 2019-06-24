/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const assert = require("power-assert");

const index = require("../../../../db/models/index");

const DummyTodo = require("../../../../helper/createHelper");
const requestHelper = require("../../../.././helper/requestHelper").request;

// 記述終了後削除
const chalk = require("chalk");

const getTodos = async () => {
  const response = await requestHelper({
    method: "get",
    endPoint: "/api/todos",
    statusCode: 200,
  });
  return response;
};

const deleteTodo = async (code, id) => {
  const response = await requestHelper({
    method: "delete",
    endPoint: `/api/todos/${id}`,
    statusCode: code,
  });
  return response;
};

describe("TEST 「DELETE /api/todos/:id」", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      const promise = await index.Todo.create(
        new DummyTodo({
          title: `title${i}`,
          body: `body${i}`,
        })
      );
      promises.push(promise);
    }
    await Promise.all(promises);
  });
  after(async () => {
    index.Todo.truncate();
  });

  it("idの引数に不正な値が入っていた場合、エラーが返る", async () => {
    const invalidIdList = [0, -1, "0", undefined, null, {}, []];

    invalidIdList.forEach(async id => {
      const response = await deleteTodo(400, id);

      assert.strictEqual(
        response.body.message,
        "idに適切でない値が入っています、1以上の数字を入れてください"
      );
    });
  });

  it("idの引数と合致するTodoがない場合、エラーが返る", async () => {
    const invalidId = 99999999999;
    const response = await deleteTodo(400, invalidId);

    assert.strictEqual(
      response.body.message,
      `検索結果: ID:${invalidId}に該当するTodoは見つかりませんでした`
    );
  });
});
