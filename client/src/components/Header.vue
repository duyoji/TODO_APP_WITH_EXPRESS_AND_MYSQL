<template>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>TODO APP</span>
        <span class="font-weight-light sub-title">using Vue.js</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab small depressed flat href="https://github.com/atlansien" target="_brank">
        <v-icon>fab fa-github</v-icon>
      </v-btn>
      <v-btn fab small depressed flat href="https://twitter.com/proghallelujah" target="_brank">
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        depressed
        flat
        class="qiita"
        href="https://qiita.com/atlansien"
        target="_brank"
      >Q</v-btn>
    </v-toolbar>
</template>
<style scoped>
.sub-title {
  font-size: 12px;
}

.qiita {
  font-size: 20px;
  font-weight: bold;
}
</style>
