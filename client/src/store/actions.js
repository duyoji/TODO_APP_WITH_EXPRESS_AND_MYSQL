import axios from "axios";

const API_URL = "http://localhost:8040/api/todos";

export default {
  async fetchTodos({ commit }) {
    try {
      const res = await axios.get(API_URL);
      const todoData = res.data;
      commit("setTodos", todoData);
    } catch (error) {
      throw new Error("APIエラーが発生しました");
    }
  },
  async postTodo({ commit }, { title, body }) {
    try {
      const res = await axios.post(API_URL, {
        title: title,
        body: body
      });
      const todoData = res.data;
      commit("addTodos", todoData);
    } catch (error) {
      throw new Error("APIエラーが発生しました");
    }
  }
};
