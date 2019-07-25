<template>
  <v-dialog v-model="isOpen" scrollable max-width="50%">
    <v-card>
      <v-card-title>
        <strong>"{{ todo.title }}"</strong>を削除しますか？
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="deleteTodoButton()" flat>はい</v-btn>
        <v-btn color="gray" flat @click="close()">いいえ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    todo: {
      id: Number,
      title: String,
      body: String,
      completed: Boolean,
      createdAt: String,
      updatedAt: String
    }
  },
  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    ...mapActions(["deleteTodo"]),
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    deleteTodoButton() {
      this.deleteTodo(this.todo.id);
      this.close();
    }
  }
};
</script>