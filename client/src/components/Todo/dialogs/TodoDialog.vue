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
      <v-card-text v-if="!isUpdate" class="modal-todo-text">{{ todo.text }}</v-card-text>
      <v-card-actions v-if="isUpdate">
        <v-text-field v-model="text" label="text" :rules="inputRule" required></v-text-field>
      </v-card-actions>
      <v-card-text class="modal-todo-date">作成日: {{ todo.date }}</v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-checkbox
          v-if="!isUpdate"
          class="modal-checkbox"
          :value="todo.completed"
          @click.stop=""
        ></v-checkbox>
        <v-layout row wrap justify-end>
          <v-btn v-if="!isUpdate" color="success" @click="dummy = !dummy" outline>編集</v-btn>
          <v-btn v-if="isUpdate" color="error" @click="dummy = !dummy">キャンセル</v-btn>
          <v-btn
            v-if="isUpdate"
            color="info"
            outline
            @click="dummy = !dummy"
            :disabled="!title || !text"
          >変更</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      copiedTodo: this.todo,
      title: "",
      text: "",
      isOpen: false,
      isUpdate: false,
      dummy: false
    };
  },
  computed: {
    inputRule() {
      return [v => !!v || "必ず入力してください"];
    }
  },
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