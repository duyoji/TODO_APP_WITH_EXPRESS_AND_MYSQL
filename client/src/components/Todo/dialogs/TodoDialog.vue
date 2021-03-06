<template>
  <v-dialog v-model="isOpen" scrollable max-width="50%">
    <v-card>
      <v-card-title v-if="!isUpdate" class="modal-todo-title">
        <div>{{ todo.title }}</div>
      </v-card-title>
      <v-card-actions class="update-title" v-if="isUpdate">
        <v-text-field v-model="title" label="title" :rules="inputRule" required></v-text-field>
      </v-card-actions>

      <v-divider></v-divider>
      <v-card-text v-if="!isUpdate" class="modal-todo-text">{{ todo.body }}</v-card-text>
      <v-card-actions v-if="isUpdate">
        <v-text-field v-model="body" label="内容" :rules="inputRule" required></v-text-field>
      </v-card-actions>
      <v-layout align-center>
        <v-alert v-model="isError" color="error" icon="warning" outline dismissible>{{ errorMsg }}</v-alert>
      </v-layout>
      <v-card-text class="modal-todo-date">
        作成日: {{ createdAt }}
        <br />
        更新日: {{ updatedAt }}
      </v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-checkbox v-if="!isUpdate" class="modal-checkbox" :value="todo.completed" @click.stop></v-checkbox>
        <v-layout row wrap justify-end>
          <v-btn v-if="!isUpdate" color="success" @click="editorOpen()" outline>編集</v-btn>
          <v-btn v-if="isUpdate" color="error" @click="editorClose()">キャンセル</v-btn>
          <v-btn
            v-if="isUpdate"
            color="info"
            outline
            @click="putTodoButton()"
            :disabled="!title || !body"
          >変更</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  props: {
    todo: {
      id: Number,
      title: String,
      body: String,
      cleatedAt: String,
      updatedAt: String,
      completed: Boolean
    }
  },
  data() {
    return {
      title: "",
      body: "",
      isOpen: false,
      isUpdate: false,
      isError: false,
      errorMsg: ""
    };
  },
  computed: {
    inputRule() {
      return [v => !!v || "必ず入力してください"];
    },
    createdAt() {
      return moment(this.todo.createdAt).format(
        "YYYY年 MM月 DD日(ddd), kk時mm分 "
      );
    },
    updatedAt() {
      return moment(this.todo.updatedAt).format(
        "YYYY年 MM月 DD日(ddd), kk時mm分 "
      );
    }
  },
  methods: {
    ...mapActions(["putTodo"]),
    open() {
      this.isOpen = true;
    },
    editorOpen() {
      this.isUpdate = true;
      this.title = this.todo.title;
      this.body = this.todo.body;
    },
    editorClose() {
      this.isUpdate = false;
    },
    async putTodoButton() {
      try {
        const editData = {
          id: this.todo.id,
          title: this.title,
          body: this.body
        };
        await this.putTodo(editData);
        this.title = "";
        this.body = "";
        this.editorClose();
      } catch (error) {
        this.isError = true;
        this.errorMsg = error.message;
      }
    }
  }
};
</script>

<style scoped>
.modal-todo-title {
  font-size: 20px;
}
.modal-todo-text {
  font-size: 16px;
}
.modal-todo-date {
  color: gray;
  font-size: 13px;
  text-align: right;
}
.modal-checkbox {
  height: 34px;
  margin: 10px 0 0px 0;
  padding: 0 0 0 10px;
}

.update-title {
  padding-bottom: 0;
}
</style>
