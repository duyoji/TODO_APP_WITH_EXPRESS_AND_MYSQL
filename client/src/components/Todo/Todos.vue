<template>
  <div>
    <v-layout row wrap justify-center>
      <app-todo v-for="todo in todos" :key="todo.id" :todo="todo" />
    </v-layout>
  </div>
</template>

<script>
import Todo from "../../components/Todo/Todo.vue";
export default {
  components: {
    appTodo: Todo
  },
};
</script>
