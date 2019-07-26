<template>
  <div>
    <v-layout>
      <v-flex md12>
        <v-alert v-model="isError" color="error" icon="warning" outline dismissible>{{ errorMsg }}</v-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <app-todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @showError="showError($event, errorMsg)"
      />
    </v-layout>
  </div>
</template>

<script>
import Todo from "../../components/Todo/Todo.vue";
export default {
  data() {
    return {
      isError: false,
      errorMsg: ""
    };
  },
  components: {
    appTodo: Todo
  },
  methods: {
    showError(errorMsg) {
      (this.isError = true), (this.errorMsg = errorMsg);
    }
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    }
  }
};
</script>
