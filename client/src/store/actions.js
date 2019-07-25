import axios from "axios";

const API_URL = "http://localhost:8040/api/todos";

export default {
  async fetchTodos({ commit }) {
    try {
      const res = await axios.get(API_URL);
      const todoData = res.data;
      commit("setTodos", todoData);
    } catch (error) {
      throw error;
    }
  },
  async postTodo({ commit }, { newTitle, newBody }) {
    try {
      const res = await axios.post(API_URL, {
        title: newTitle,
        body: newBody,
        completed: false
      });
      const todoData = res.data;
      commit("addTodo", todoData);
    } catch (error) {
      throw error;
    }
  },
  async putTodo({ commit }, editData) {
    try {
      // TODO: 別ブランチででAPI_URLをdeleteTodoと同じ形に修正
      const res = await axios.put(API_URL + `/${editData.id}`, {
        title: editData.title,
        body: editData.body
      });
      const todoData = res.data;
      commit("updateTodo", todoData);
    } catch (error) {
      throw error;
    }
  },
  async deleteTodo({ commit }, deleteId) {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      commit("deleteTodo", deleteId);
    } catch (error) {
      throw error;
    }
  }
};
