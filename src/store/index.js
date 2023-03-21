import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    heightsWithTime: [],
    personInfo: {
      name: "",
      age: null,
      dob: null,
    },
  },
  mutations: {
    addHeight(state, payload) {
      state.heightsWithTime.push(payload);
    },
    deleteHeight(state, payload) {
      state.heightsWithTime.splice(payload, 1);
    },
    setHeightsWithTime(state, payload) {
      state.heightsWithTime = payload;
    },
    SET_PERSON_INFO(state, payload) {
      state.personInfo.name = payload.name;
      state.personInfo.age = payload.age;
      state.personInfo.dob = payload.dob;
      localStorage.setItem("personName", payload.name);
      localStorage.setItem("personAge", payload.age);
      localStorage.setItem("personDOB", payload.dob);
    },
  },
  getters: {
    getPersonInfo(state) {
      const name = localStorage.getItem("personName");
      const age = localStorage.getItem("personAge");
      const dob = localStorage.getItem("personDOB");
      if (name && age && dob) {
        state.personInfo.name = name;
        state.personInfo.age = age;
        state.personInfo.dob = dob;
      }
      return state.personInfo;
    },
  },
  actions: {
    addHeight(context, payload) {
      context.commit("addHeight", payload);
      localStorage.setItem(
        "heightsWithTime",
        JSON.stringify(context.state.heightsWithTime)
      );
    },
    deleteHeight(context, payload) {
      context.commit("deleteHeight", payload);
      localStorage.setItem(
        "heightsWithTime",
        JSON.stringify(context.state.heightsWithTime)
      );
    },
    loadHeight(context) {
      const heights = localStorage.getItem("heightsWithTime");
      if (heights) {
        context.commit("setHeightsWithTime", JSON.parse(heights));
      }
    },
  },
});
