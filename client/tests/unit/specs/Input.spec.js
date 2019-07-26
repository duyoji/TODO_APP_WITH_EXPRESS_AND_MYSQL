import { mount, createLocalVue } from "@vue/test-utils";
import Input from "@/components/Input.vue";
import Vue from "vue"
import Vuetify from "vuetify";
import Vuex from "vuex";

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

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe("TEST Input.vue", () => {
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      postTodo: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
  });
  it("タイトルと内容を入力した時、actions.putTodoは成功する", () => {
    const wrapper = mount(Input, { store, localVue });
    wrapper.find(".new-title").setValue("newTitle");
    wrapper.find(".new-body").setValue("newBody");
    const postBtn = wrapper.find(".v-btn");
    postBtn.trigger("click");
    expect(actions.postTodo).toHaveBeenCalledWith(
      expect.anything(),
      { newTitle: "newTitle", newBody: "newBody" },
      undefined
    );
  });
});
