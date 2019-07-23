<template>
  <div>
    <v-container xs12 sm6 md3>
      <v-card hover class="card" width="200px" @click="dummy = !dummy">
        <v-layout justify-end class="closeBox">
          <v-btn @click.stop="" class="closeBtn" fab small depressed flat>
            <v-icon>far fa-times-circle</v-icon>
          </v-btn>
        </v-layout>

        <v-layout align-center justify-center class="card-inside">
          <v-flex xs2 grow>
            <v-checkbox
              class="checkbox"
              :value="todo.completed"
              @click.stop=""
            ></v-checkbox>
          </v-flex>
          <v-flex>
            <v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="todo.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile-action>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <app-todo-dialog :todo="selectedTodo" ref="todoDialog"></app-todo-dialog>
    <app-delete-dialog :todo="selectedTodo" ref="deleteDialog"></app-delete-dialog>
  </div>
</template>

<script>
import TodoDialog from "./dialogs/TodoDialog.vue";
import DeleteDialog from "./dialogs/DeleteDialog.vue";
export default {
  props: {
    todo: {
      id: Number,
      title: String,
      text: String,
      date: String,
      completed: Boolean
    }
  },
  data() {
    return {
      selectedTodo: {},
      dummy: false
    };
  },
  components: {
    appTodoDialog: TodoDialog,
    appDeleteDialog: DeleteDialog
  }
};
</script>

<style scoped>
.card {
  border: 2px solid lightseagreen;
  color: gray;
  background-color: transparent;
  padding: 0 10px;
}
.closeBox {
  height: 15px;
  width: 190px;
  text-align: center;
}

.closeBtn {
  height: 30px;
  width: 30px;
  color: gray;
}
.card-inside {
  height: 50px;
  box-sizing: content-box;
  vertical-align: middle;
}
</style>