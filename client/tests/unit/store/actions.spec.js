import actions from "@/store/actions";

let url = "";
let body = {};

jest.mock("axios", () => ({
  get: _url => {
    return new Promise(resolve => {
      url = _url;
      resolve(true);
    });
  }
}));
