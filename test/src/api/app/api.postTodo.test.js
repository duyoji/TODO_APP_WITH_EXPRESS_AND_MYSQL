/* eslint-disable no-undef */
const assert = require("power-assert");
// eslint-disable-next-line no-unused-vars
const chalk = require("chalk");

const index = require("../../../../db/models/index");

const DummyTodo = require("../../../../helper/createHelper");
const requestHelper = require("../../../../helper/requestHelper").request;
const replaceHelper = require("../../../../helper/replaceHelper")
  .backSlashReplase;

const getTodos = async () => {
  const response = await requestHelper({
    method: "get",
    endPoint: "/api/todos",
    statusCode: 200,
  });
  return response.body;
};

const createTodo = async (code, data) => {
  const response = await requestHelper({
    method: "post",
    endPoint: "/api/Todos",
    statusCode: code,
  }).send(data);
  return response;
};

describe("test 「POST /api/todos」", () => {
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
  it("titleを送らなかった場合、エラーが返る", async () => {
    const data = { body: "bad data" };

    await createTodo(400, data);
  });
  it("bodyを送らなかった場合、エラーが返る", async () => {
    const data = { title: "bad data" };

    const response = await createTodo(400, data);

    const errorMessage = replaceHelper(response.body.message);

    assert.strictEqual(
      errorMessage,
      "Field 'body' doesn't have a default value"
    );
  });
  it("completedにboolean、またnumber以外を送った場合、エラーが返る", async () => {
    const data = {
      title: "bad data",
      body: "bad data",
      completed: "bad completed",
    };

    const response = await createTodo(400, data);

    const errorMessage = replaceHelper(response.body.message);

    assert.strictEqual(
      errorMessage,
      "Incorrect integer value: '" +
        data.completed +
        "' for column `database_test`.`todos`.`completed` at row 1"
    );
  });
  it("completedにboolean型に変換できない数字を送った場合、エラーが返る", async () => {
    const invalidCompleted = 3;
    const data = {
      title: "bad data",
      body: "bad data",
      completed: invalidCompleted,
    };

    const response = await createTodo(400, data);

    assert.strictEqual(
      response.body.message,
      "completedにはboolean型を入力してください"
    );
  });
  it("適切にデータを送った場合、新規作成されたTodo１件が返ってくる。また、作成されたTodo一件はテーブルに格納されている", async () => {
    const oldTodos = await getTodos();

    const data = {
      title: "test title",
      body: "test body",
    };

    const response = await createTodo(200, data);
    const todo = response.body;

    // 新規作成されたTodo１件が返ってくる
    assert.deepStrictEqual(todo, {
      id: todo.id,
      title: data.title,
      body: data.body,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });

    const currentTodos = await getTodos();

    // 新規作成されたToco１件がテーブルに格納されている
    assert.strictEqual(oldTodos.length + 1, currentTodos.length);
  });
});
