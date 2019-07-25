<template>
  <v-dialog v-model="isOpen" scrollable max-width="50%">
    <v-card>
      <v-card-title>
        <strong>"{{ todo.title }}"</strong>を削除しますか？
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="dummy = !dummy" flat>はい</v-btn>
        <v-btn color="gray" flat @click="dummy = !dummy">いいえ</v-btn>
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
      isOpen: false,
      dummy: false
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    cloce() {
      this.isOpen = false;
    }
  },
};
</script>