/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const assert = require("power-assert");

const index = require("../../../../src/db/models/index");

const DummyTodo = require("../../../helper/createHelper");
const requestHelper = require("../../../helper/requestHelper").request;

const updateTodo = async (code, id, data) => {
  const response = await requestHelper({
    method: "put",
    endPoint: `/api/todos/${id}`,
    statusCode: code,
  }).send(data);
  return response;
};

describe("TEST 「PUT /api/todos/:id」", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
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
    const invalidIdList = [0, -1, "0", undefined, null, {}, []];
    const data = {
      title: "title",
      body: "body",
    };

    invalidIdList.forEach(async id => {
      const response = await updateTodo(400, id, data);

      assert.strictEqual(
        response.body.message,
        "idに適切でない値が入っています、1以上の数字を入れてください"
      );
    });
  });

  it("idの引数と合致するTodoがない場合、エラーが返る", async () => {
    const invalidId = 99999999999999999;
    const data = {
      title: "title",
      body: "body",
    };

    const response = await updateTodo(400, invalidId, data);
    assert.strictEqual(
      response.body.message,
      `検索結果: ID:${invalidId}に該当するTodoは見つかりませんでした`
    );
  });

  it("completedにboolean型以外を送った場合、エラーが返る", async () => {
    const invalidCompletedList = [-1, 2, "0", null, [], {}];
    const id = 3;

    invalidCompletedList.forEach(async completed => {
      const data = {
        title: "title",
        body: "body",
        completed: completed,
      };

      const response = await updateTodo(400, id, data);
      assert.strictEqual(
        response.body.message,
        "completedにはboolean型のみを入力してください"
      );
    });
  });

  it("titleを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { title: "update title" };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      // idと合致したTodo一件のtitle、body、completed全て、またはいずれかが変更され返ってくる
      assert.deepStrictEqual(todo, {
        id: validId,
        title: data.title,
        body: todo.body,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている

      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
  it("bodyを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { body: "update body" };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: todo.title,
        body: data.body,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);
      done();
    }, 10);
  });
  it("completedを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { completed: true };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: todo.title,
        body: todo.body,
        completed: data.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
  it("titleとbodyを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { title: "update title", body: "update body" };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: data.title,
        body: data.body,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
  it("titleとcompletedを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { title: "update title", completed: true };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: data.title,
        body: todo.body,
        completed: data.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
  it("bodyとcompletedを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = { body: "update body", completed: true };

      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: todo.title,
        body: data.body,
        completed: data.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
  it("title、body、completedを更新した場合、データは適切に帰ってくる、また、DB内のデータも更新されている", done => {
    setTimeout(async () => {
      const validId = 3;

      const oldTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      const data = {
        title: "update title",
        body: "update body",
        completed: true,
      };
      const response = await updateTodo(200, validId, data);
      const todo = response.body;

      assert.deepStrictEqual(todo, {
        id: validId,
        title: data.title,
        body: data.body,
        completed: data.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      // 変更されたTodo１件のupdatedAtは更新されている
      assert.strictEqual(todo.updatedAt > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      // DBに格納されていたidと紐つくTodoは変更されたTodoに上書きされる
      assert.notStrictEqual(oldTodo, currentTodo);

      done();
    }, 10);
  });
});
