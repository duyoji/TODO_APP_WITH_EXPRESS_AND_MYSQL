<template>
  <div>
    <v-form>
      <v-container>
        <v-layout>
          <v-flex md12>
            <v-alert
              v-model="isError"
              color="error"
              icon="warning"
              outline
              dismissible
            >{{ errorMsg }}</v-alert>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <v-flex xs12 sm4 md5>
            <!-- テストのため一時的にinputを使用 -->
            <v-text-field label="タイトルを入力してください" validate-on-blur :rules="inputRule" v-model="title" class="new-title" data-test="zipCodeText1"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md5>
            <v-text-field label="内容を入力してください" validate-on-blur :rules="inputRule" v-model="body" data-test="zipCodeText2"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-btn
              outline
              align-center
              color="primary"
              :disabled="!title || !body"
              @click="postTodoButton()"
            >送信</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
      body: "",
      isError: false,
      errorMsg: ""
    };
  },
  computed: {
    inputRule() {
      return [v => !!v || "必ず入力してください"];
    }
  },
  methods: {
    ...mapActions(["postTodo"]),
    async postTodoButton() {
      try {
        await this.postTodo({ newTitle: this.title, newBody: this.body });
        this.title = "";
        this.body = "";
      } catch (error) {
        this.isError = true;
        this.errorMsg = error.message;
      }
    }
  }
};
</script>