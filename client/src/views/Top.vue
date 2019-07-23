<template>
  <div>
    <v-app>
      <app-header />
      <v-content>
        <app-input />
        <app-todos />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Input from "../components/Input.vue";
import Todos from "../components/Todo/Todos.vue";
import { mapActions } from "vuex";
export default {
  components: {
    appHeader: Header,
    appInput: Input,
    appTodos: Todos
  },
  methods: {
    ...mapActions["fetchTodos"]
  },
  created() {
    this.fetchTodos();
  }
};
</script>
