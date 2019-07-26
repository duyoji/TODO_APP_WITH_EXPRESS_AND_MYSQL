import { mount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header.vue";
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

describe("TEST Header.vue", () => {
  it("ボタンの動作チェック", () => {
    const wrapper = mount(Header, {
      localVue
    });

    const githubBtn = wrapper.find(".github-btn");
		console.log(githubBtn)

    expect(githubBtn.exists()).toBe(true);

    const twitterBtn = wrapper.find(".twitter-btn");
    expect(twitterBtn.exists()).toBe(true);

    const qiitaBtn = wrapper.find(".qiita-btn");
    expect(qiitaBtn.exists()).toBe(true);
  });
});
