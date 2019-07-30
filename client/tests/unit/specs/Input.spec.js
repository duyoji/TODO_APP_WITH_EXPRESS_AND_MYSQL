import { mount, createLocalVue } from "@vue/test-utils";
import Input from "@/components/Input.vue";
import Vue from "vue";
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

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

let actions;
let store;

actions = {
  postTodo: jest.fn()
};
store = new Vuex.Store({
  actions
});

describe("TEST Input.vue", () => {
  it("タイトルと内容を入力して送信した時、actions.putTodoは成功する", (done) => {
    const wrapper = mount(Input, { store, localVue });
    wrapper.find('[data-test="zipCodeText1"]').setValue("newTitle");
    wrapper.find('[data-test="zipCodeText2"]').setValue("newBody");
    const postBtn = wrapper.find(".v-btn");

    // `setValue` のタイミングが非同期だからか、すｇにpostBtn.trigger('click')をすると
    // `isDisabledButton` はtrueになるが、setTimeoutでタイミングを少しずらすことで、
    // `isDisabledButton` はfalseになり、disabledがあっても意図通りの挙動が確認できるようになった
    setTimeout(() => {
      postBtn.trigger("click");
      expect(actions.postTodo).toHaveBeenCalledWith(
        expect.anything(),
        { newTitle: "newTitle", newBody: "newBody" },
        undefined
      );
      done();
    }, 0);
  });
});
