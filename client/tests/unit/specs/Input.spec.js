import { mount, createLocalVue } from "@vue/test-utils";
import Input from "@/components/Input.vue";
import Vuetify from "vuetify";

// 警告非表示
const logError = console.error;
console.error = (...args) => {
  if (
    args[0].includes("[Vuetify]") &&
    args[0].includes("https://github.com/vuetifyjs/vuetify/issues/4068")
  )
    return;
  logError(...args);
};

const localVue = createLocalVue();
localVue.use(Vuetify);