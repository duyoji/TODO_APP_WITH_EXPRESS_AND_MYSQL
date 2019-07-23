import axios from "axios";

const API_URL = "http://localhost:8040/api/todos";

export default {
	async fetchTodos({commit}) {
		try {
			const res = await axios.get(API_URL);
			const todoData = res.data;
			commit("setTodos", todoData);
		}catch (error) {
			throw new Error("APIエラーが発生しました")
		}
	}
}