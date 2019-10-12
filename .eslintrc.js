module.exports = {
  root: true,
  env: {
    node: true
  },
  /*定义全局变量，防止提示报错*/
  globals: {
    Vue: true,
    VueRouter: true,
    Vuex: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
