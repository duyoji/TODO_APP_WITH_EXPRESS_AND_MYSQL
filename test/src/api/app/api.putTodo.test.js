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
    const invalidIdList = [0, -1, "0", undefined, null, [], {}];
    const data = {
      title: "title",
      body: "body",
    };

    for (let i = 0; i < 5; i++) {
      const response = await updateTodo(400, invalidIdList[i], data);
      assert.strictEqual(
        response.body.message,
        "idに適切でない値が入っています、1以上の数字を入れてください"
      );
    }

    // invalidIdList.forEach(async id => {
    //   const response = await updateTodo(400, id, data);
    //   assert.strictEqual(
    //     response.body.message,
    //     "idに適切でない値が入っています、1以上の数字を入れてください"
    //   );
    // });
  });

  it("idの引数と合致するTodoがない場合、エラーが返る", async () => {
    const invalidId = 99999999999999999;
    const data = {
      title: "title",
      body: "body",
    };

    const response = await updateTodo(400, id, data);
    assert.strictEqual(
      response.body.message,
      `検索結果: ID${invalidId}に該当するTodoは見つかりませんでした`
    );
  });

  it("completedにboolean型以外を送った場合、エラーが返る", async () => {
    const invalidCompletedList = [-1, 2, "0", null, [], {}];
    const id = 3;

    for (let i = 0; i < 5; i++) {
      const data = {
        title: "title",
        body: "body",
        completed: invalidCompletedList[i],
      };

      const response = await updateTodo(400, id, data);
      assert.strictEqual(
        response.body.message,
        "completedにはboolean型のみを入力してください"
      );
    }
  });

  it("適切にデータを送った場合、idと合致したTodo一件のtitle、body、completed全て、またはいずれかが変更され返ってくる、また配列内にあったidと紐つくコメントは変更されたコメントに上書きされる", async () => {
    const validId = 3;

    const oldTodo = await index.Todo.findOne({
      where: {
        id: validId,
      },
    });

    datas = [
      { title: "title" },
      { body: "body" },
      { completed: true },
      { title: "title", body: "body" },
      { title: "title", completed: true },
      { body: "body", completed: true },
      { title: "title", body: "body", completed: true },
    ];

    for (let i = 0; i < 5; i++) {
      const response = await updateTodo(200, validId, datas[i]);
      const todo = response.body;

      if (datas[i].title && datas[i].body && datas[i].completed) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: datas[i].title,
          body: datas[i].body,
          completed: datas[i].completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].title && datas[i].body) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: datas[i].title,
          body: datas[i].body,
          completed: todo.completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].title && datas[i].completed) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: datas[i].title,
          body: todo.body,
          completed: datas[i].completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].body && datas[i].completed) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: todo.title,
          body: datas[i].body,
          completed: datas[i].completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].title) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: datas[i].title,
          body: todo.body,
          completed: todo.completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].body) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: todo.title,
          body: datas[i].body,
          completed: todo.completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      } else if (datas[i].completed) {
        assert.deepStrictEqual(todo, {
          id: validId,
          title: todo.title,
          body: datas[i].body,
          completed: todo.completed,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      }

      assert.strictEqual(todo.updateTodo > todo.createdAt, true);

      const currentTodo = await index.Todo.findOne({
        where: {
          id: validId,
        },
      });

      assert.notStrictEqual(oldTodo, currentTodo);
    }
  });
});
